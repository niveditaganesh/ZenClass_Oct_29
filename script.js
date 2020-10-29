function makeRequest(method, url){
return new Promise(function(resolve,reject){
    var request=new XMLHttpRequest();
    request.open(method,url);
    request.send();
    request.onload=function(){
        if(request.status==200){
            resolve(JSON.parse(request.response));
        }else{
            reject({
                message:request.statusText
            });
        }request.onerror=function(){
            reject({
                message:request.statusText
            });
        };
    }; 
});
}
var s=[]
makeRequest('GET','https://restcountries.eu/rest/v2/all')
.then(function(result){
    console.log(result);
   for(i in result){
       var title=`<b>${result[i].name}</b>`;
       var info=`Region:<b>${result[i].region}</b><br>Lat-Long:<b>${result[i].latlng}</b>` 
       var capital=`<b>${result[i].capital}</b>`;
      ele=result[i]
      for(j=0;j<ele.currencies.length;j++){
    currency=`Code:<b>${ele.currencies[j].code}</b><br>Name:<b>${ele.currencies[j].name}</b><br>Symbol:<b>${ele.currencies[j].symbol}</b> `
s.push(currency)}
       var div1=document.createElement('div');
       div1.setAttribute('class','card')
       div1.setAttribute('id','div1')
       var div2=document.createElement('div');
       div2.setAttribute('class','card-body')
       var tit=document.createElement('h6');
       tit.setAttribute('class','card-title');
       tit.innerHTML=title;
       div2.append(tit);
       var image=document.createElement('img');
       image.setAttribute('class','card-img-top');
       image.setAttribute('src',`${result[i].flag}`)
       image.setAttribute('alt',`${result[i].flag}`)
       var cap=document.createElement('p');
       cap.setAttribute('class','card-text btn btn-success btn-sm');
       cap.setAttribute('id','cap')
       cap.innerHTML=capital;
       var capn=document.createElement('p');
       capn.setAttribute('class','card-text ');
       capn.setAttribute('id','capn')
       capn.innerHTML='Capital:'

       
       var list=document.createElement('ul');
       list.setAttribute('class','list-group list-group-flush')
       var line=document.createElement('li')
       line.setAttribute('class','list-group-item');
       line.innerHTML=info;
       var line2=document.createElement('li')
       line2.setAttribute('class','list-group-item');
       line2.innerHTML='Currency:';
       var line1=document.createElement('li')
       line1.setAttribute('class','list-group-item');
       line1.innerHTML=s.join(' ');
       s.length=0;
       list.append(line,line2,line1)
       div1.append(div2,image,capn,cap,list)
       document.body.append(div1)

   }
    
})
.catch(function(error){
    console.log(error)
})

	


      
        