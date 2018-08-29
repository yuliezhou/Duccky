<template>
	<div class="swiper-container" :class="swiperid">
		<div class="swiper-wrapper">
			<slot></slot>
		</div>
		<div :class='{"swiper-pagination":pagination}' :style='{"text-align":paginationDire}'></div>
	</div>
</template>
<script >
import '../assets/libs/swiper/js/swiper.js';
	export default{
		props:{
			swiperid:{
				type:String,
				default:''
			},
			pagination:{
				type:Boolean,
				default:true
			},
			paginationDire:{
				type:String,
				default:'center'
			},
			effect:{
				type:String,
				default:'slide'				
			},
			loop:{
				type:Boolean,
				default:true				
			},
			derection:{
				type:String,
				default:'horizontal'				
			},
			autoplay:{
				type:Number,
				default:5000				
			},
			paginationType:{
				type:String,
				default:'bullets'
			}
		},
		mounted:function(){
			var That=this
			new Swiper('.'+That.swiperid,{
				loop:That.loop,
				pagination:'.swiper-pagination',
				paginationType:That.paginationType,
				autoplay:That.autoplay,
				derection:That.derection,
			    effect:That.effect
			})
		}
	}
</script>
<style>
@import '../assets/libs/swiper/css/swiper.css';
.swiper-container img{width: 100%}
.swiper-pagination-bullet-active{background: #fff}
</style>
