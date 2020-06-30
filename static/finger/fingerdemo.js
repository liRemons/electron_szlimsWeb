
async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const Finger = require('./build/Release/finger')
Finger.openDevice(0,0,0, (res) => {
  console.log('[Finger.openDevice]  = ' + res)
})
Finger.linkDevice((res) => {
  console.log('[Finger.linkDevice]  = ' + res)
})
//登记指纹
//Finger.enrolFpChar()  
//匹配指纹
Finger.genFpChar()

//参考模板，右手食指
var f1=`AwFRF30A/Ab4AvAC4ALgAuACwALAAsAC8ALwAvgC+AL4AvwC/AL8AgAAAAAAAAAAAAAAAAAAAABl
qYieNLQNPkC8y15rQYk+YIxaXy8M659CEVUfaBHcHzKZa19BnWzfZaVdHzknUf9TKQa/Ni6O32Yv
nn9QuAp/TBvWHU6jlrpQH0S7PLUMGEmglflLMYkxQy4EDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMBVBp6AMAOgAaAAoACgAKAAoACgAKABoAGgAaA
BoAGgA6ADoAOgB4AAAAAAAAAAAAAAAAAAAAAUZ4IPjwtin5YNkl+LgYVHxML6JcfjitfPBmXH1GZ
nP9nGZ5fJxuRv0IfBv9SpB5fYCoI/ywwyz8YNMx/OjjhHy0+4T8QQeHXH6QOfC6SAD0gJ4z9OBDW
WzwUBJs1lVXZKymLtzgmSQ8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`;



async function main() {
	console.log('/main')
	while(true)
	{
		Finger.getWorkMsg((res) => {
			if(res<0)
				return ;
		  
		  console.log('[Finger.getWorkMsg]  = ' + res)
		  //FPM_PLACE=02		&&请按手指
		  if(res==2)  
		  {
			  console.log("请按手指");
		  }
		  if(res==3)
		  {
			  console.log("请抬起手指");
		  }
		  if(res==4)
		  {
			  console.log("采集图像完成");
		  }
		  if(res==5)
		  {
			  console.log("采集特征点");
			   Finger.getFpStrByGen((res) =>{
				  
				  console.log("匹配模板:",res);
				  
				   Finger.matchTemplateEx(res,f1,(res)=>{
					   console.log("比对结果:"+res);
				   });
				  
			  });
		  }
		  if(res==6)
		  {
			  console.log("登记指纹");
			  Finger.getFpStrByEnl((res) =>{
				  
				  console.log(res);
			  });
			  
		  }
		  if(res==7)
		  {
			  console.log("新的指纹图像");
		  }
		  if(res==8)
		  {
			  console.log("超时");
		  }
		  if(res==9)
		  {
			  console.log("IMGVAL");
		  }
		  
			  
		})
		await sleep(1000)
	}
}

main();
