<template>
	<div>
	    <div class="flex_center">
	      <div class="item"></div>
	      <div class="item"></div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		computed:{

		},
		methods:{
			fn:function(){
				this.$router.push('/'+this.id);
				this.$emit('change',this.id)
			}
		}
	}
</script>
<style>
  .empty{
    height: 57px;
    width: 100%;
  }
  .item{
    width: 45%;
    height: 50px;
    border: 1px solid #000;
  }

</style>