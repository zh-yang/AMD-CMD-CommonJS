requirejs.config({
	baseUrl : 'js/lib',
	paths : {
		app : '../app'
	}
})

requirejs(['jquery','app/testa','app/testb'],function($,testa,testb){
	var a = testa,b = testb,c = a + b
	$('#test').html([a,'+',b,'=',c])

})