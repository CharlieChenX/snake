
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	
	//创建订单
	async createOrder() {
		const {
			ctx,
			app
		} = this;
		const header = {
			["Payment-Key"]: app.config.AppKey,
			["Payment-Secret"]: app.config.AppSecret
		}
		const {price,name,reurl,thirduid,remarks,other}= ctx.request.body;
        let data = {
            price:price?price:1,
            name:name?name:"测试名字",
            reurl:reurl?reurl:"http://localhost:8000/monitorMessage",
            thirduid:thirduid?thirduid:"a2323223232",
			remarks:remarks?remarks:"给我来个大的",
			other:other?other:"测试其他信息",
		};
		//调用站长付下单
        const result = await ctx.curl('https://admin.zhanzhangfu.com/order/createOrder', {
            data: data,
            headers: header,
            dataType: 'json',
            timeout: 5000,
		});
		await ctx.render('index', {
			data:result.data
		})
	}


	//查询订单状态
	async findOrderState(){
		const {
			ctx,
			app
		} = this;
		const header = {
			["Payment-Key"]: app.config.AppKey,
			["Payment-Secret"]: app.config.AppSecret
		}
		const {orderId}= ctx.query;
		console.log("订单号:",orderId)
		//调用站长付查询订单
		const result = await ctx.curl('https://admin.zhanzhangfu.com/order/onlinePayFindResult', {
            data: {orderId},
            headers: header,
            dataType: 'json',
            timeout: 5000,
		});
		ctx.body=result.data;
	}


	//站长付监听用户动作
	async monitorMessage(){
		const {
			ctx
		} = this;
		console.log("消息:",ctx.request.body);
	}

}
