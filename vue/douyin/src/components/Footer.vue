<template>
	<div>
		<div class="footer1">
			<div class="container">
				<div class="footer1_left">
					<div class="footer1_left_item">
						<h3>关于</h3>
						<a href="##">联系我们</a>
						<a href="##">@抖音数据助手</a>
					</div>
					<div class="footer1_left_item">
						<h3>帮助</h3>
						<a href="##">意见反馈</a>
						<a href="##">报错</a>
					</div>
					<div class="footer1_left_item">
						<h3>合作</h3>
						<a href="##">商务合作</a>
						<a href="##">资源收录</a>
					</div>
					<div class="clear"></div>
				</div>
				<div class="footer1_right"></div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="footer">
			<p>重庆九吨科技版权所有</p>
		</div>
	</div>
</template>
<style scoped lang="less">
	.footer1{
		padding: 50px 0 20px; 
		.footer1_left{
			float: left;
			.footer1_left_item{
				width: 130px;
				float: left;
				h3{
					color({1:string})#fff;
					font-size: 14px;
					margin-bottom: 11px;
					width: 100%;
				}
				a{
					color:#fff;
					font-size: 12px;
					opacity: 0.8;
					margin-bottom: 9px;
					display: inline-block;
					width: 100%;
				}
			}
		}
	}
	.footer{
		padding: 20px 0;
		width: 100%;
		background: #000;
		p{
			text-align: center;
			font-size: 14px;
			color: #fff;			
		}
	}
</style>