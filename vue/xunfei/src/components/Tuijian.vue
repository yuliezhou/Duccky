<template>
	<div>
		<Swiperbanner swiperid='swiper1' :autoplay='1500'>
			<div class="swiper-slide">
				<img src="../assets/images/banner/1_02.jpg" alt="">
			</div>
			<div class="swiper-slide">
				<img src="../assets/images/banner/3_02.jpg" alt="">
			</div>
			<div class="swiper-slide">
				<img src="../assets/images/banner/1_02.jpg" alt="">
			</div>
		</Swiperbanner>
		<Skinicon></Skinicon>
		<Skinbox></Skinbox>
	</div>
</template>
<script type="text/javascript">
	import Swiperbanner from './Swiperbanner'
	import Skinicon from './Skinicon'
	import Skinbox from './Skinbox'
	export default {
		components:{
			Swiperbanner,
			Skinicon,
			Skinbox
		}
	}
</script>
