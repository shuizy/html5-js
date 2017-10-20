for (var i=1; i<=6; i++) 
	{
	for (var j=1;j<=6; j++) 
	{
		var ID=new Array('d',i,j);
		ID=ID.join("");//拼接ID
		var vertical=80*(j-1);
		vertical=vertical+"px";//控制竖直方向的位置
		var horizon=80*(i-1);
		horizon=horizon+"px";//控制水平方向的位置
		//-------------------js控制css-----------------------
		document.getElementById(ID).style.position="absolute";
		document.getElementById(ID).style.top=horizon;
		document.getElementById(ID).style.left=vertical;
		document.getElementById(ID).style.width="80px";
		document.getElementById(ID).style.height="80px";
		document.getElementById(ID).style.lineHeight="100px";
		document.getElementById(ID).style.fontWeight="900";
		document.getElementById(ID).style.borderRadius="5%";
		document.getElementById(ID).innerHTML='<img src="0.jpg" height="80" width="80" />';
		//document.getElementById(ID).style.background="rgba(170, 230, 86, 0.82)";
	}	
}//画出36个方格
var score=0;                               //石头100；炸弹-1；空地0；草1；灌木2；树3；草屋4；木屋5；蓝屋6；白屋7；金字塔8；埃菲尔铁塔9
var now;                                     //当前物品
var tuo;
function rand(min,max) {                                             //产生一个随机数
	return parseInt(Math.random()*(max-min)+min);
}
var box=new Array();                         //box[6][6]
function Initial() {                                                 //初始化box[][]
	for (var i = 0; i <=6; i++) {
		box[i]=new Array();
		for (var j = 0; j <=6; j++) {
			box[i][j]=0;
		}
	}
}
Initial();

function Init()
{
	var t=0;                                       //计数，有36-1=35个格子，计划放15个=2/16石头+6/16草+3/16灌木+2/16树+1/16草屋+1/16木屋
	var x,y,k;                                     //      100    1     2    3    4    5     6     7     8
	while(t<=16)                                //分数      10    1     3   10    30   90    300  900    3000
	{
		x=rand(1,7);
		y=rand(1,7);
		if(box[x][y]==0)
		{
			var ID=new Array('d',x,y);
			ID=ID.join("");
			k=rand(1,17);
			switch(k)
			{
				case 1:case 2:case 16:box[x][y]=100;document.getElementById(ID).innerHTML='<img src="100.jpg" height="80" width="80" />';score+=10;break;
				//放石头
				case 3:case 4:case 5:case 6:case 7:case 11:box[x][y]=1;document.getElementById(ID).innerHTML='<img src="1.jpg" height="80" width="80" />';score+=1;break;
				//放草
				case 8:case 9:case 10:box[x][y]=2;document.getElementById(ID).innerHTML='<img src="2.jpg" height="80" width="80" />';score+=3;break;
				//放灌木
				case 12:case 13:box[x][y]=3;document.getElementById(ID).innerHTML='<img src="3.jpg" height="80" width="80" />';score+=10;break;
				//放树
				case 14:box[x][y]=4;document.getElementById(ID).innerHTML='<img src="4.jpg" height="80" width="80" />';score+=30;break;
				//放草屋
				case 15:box[x][y]=5;document.getElementById(ID).innerHTML='<img src="5.jpg" height="80" width="80" />';score+=90;break;
				//放木屋
				default:t--;
			}
			t++;
		}
	}
	document.getElementById("score").innerHTML="得分:"+score;
	document.getElementById("d11").innerHTML='<img src="t.jpg" height="80" width="80" />';
	tuo=0;
}
Init();
function inow()
{
	document.getElementById("ooo").style.width="120px";
	document.getElementById("ooo").style.height="120px";
	document.getElementById("ooo").style.lineHeight="100px";
	document.getElementById("ooo").style.fontWeight="900";
	document.getElementById("ooo").style.borderRadius="20%";
	var a=rand(1,200);
	if(a<=145) {document.getElementById("ooo").innerHTML='<img src="p1.jpg" height="100" width="100" />';now=1;}
	else if(a<=170) {document.getElementById("ooo").innerHTML='<img src="p2.jpg" height="100" width="100" />';now=2;}
	else if(a<=185) {document.getElementById("ooo").innerHTML='<img src="p3.jpg" height="100" width="100" />';now=3;}
	else if(a<=195) {document.getElementById("ooo").innerHTML='<img src="p4.jpg" height="100" width="100" />';now=4;}
	else {document.getElementById("ooo").innerHTML='<img src="p-1.jpg" height="100" width="100" />';now=-1;}
}
inow();
var b=new Array();                         //b[6][6]
var n2;
function stb() {                                                 //初始化b[][],后用来记录放的小方块
	for (var i = 0; i <=6; i++) {
		b[i]=new Array();
		for (var j = 0; j <=6; j++) {
			b[i][j]=0;
		}
	}
	n2=0;
}

function seek(i,j)
{
	//寻找i,j附近是否有now元素
	if(j-1>=1&&box[i][j-1]==now) 
	{
		if(b[i][j-1]==0){
			b[i][j-1]=1;
			n2++;
			seek(i,j-1);
		}
	}
	if(j+1<=6&&box[i][j+1]==now)
	{
		if(b[i][j+1]==0)
		{
			b[i][j+1]=1;
			n2++;
			seek(i,j+1);
		}
	}
	if(i+1<=6&&box[i+1][j]==now)
	{
		if(b[i+1][j]==0) {
			b[i+1][j]=1;
			n2++;
			seek(i+1,j);
		}
	}
	if(i-1>=1&&box[i-1][j]==now)
	{
		if(b[i-1][j]==0)
		{
			b[i-1][j]=1;
			n2++;
			seek(i-1,j);
		}
	}	
}
var v1,v2,v3,v4,v5,v6;
function lighton(x,y)
{
	if(x==1&&y==1) return;
	if(box[x][y]!=0||(now==100||now==-1)) return;                           //如果是不是空地，不发生反应
	else                                            //如果是空地，观察接邻的相同的值的方块数
	{
		stb();
		x=parseInt(x);
		y=parseInt(y);
		seek(x,y);
		if(n2>=2)
		{
			var i,j;
			for(i=1;i<=6;i++)
			{
				for(j=1;j<=6;j++){
					if(b[i][j]==1)
					{
						var ID=new Array('d',i,j);
						ID=ID.join("");
						switch(now)
						{
							case 1:document.getElementById(ID).innerHTML='<img src="11.jpg" height="80" width="80" />';break;
							case 2:document.getElementById(ID).innerHTML='<img src="22.jpg" height="80" width="80" />';break;
							case 3:document.getElementById(ID).innerHTML='<img src="33.jpg" height="80" width="80" />';break;
							case 4:document.getElementById(ID).innerHTML='<img src="44.jpg" height="80" width="80" />';break;
							case 5:document.getElementById(ID).innerHTML='<img src="55.jpg" height="80" width="80" />';break;
							case 6:document.getElementById(ID).innerHTML='<img src="66.jpg" height="80" width="80" />';break;
						}
						document.getElementById(ID).style.width="80px";
						document.getElementById(ID).style.height="80px";
					}
				}
			}
		}
	}
	return;	
}
 function lightoff(){
	if(n2>=2)
		{
			var i,j;
			for(i=1;i<=6;i++)
			{
				for(j=1;j<=6;j++){
					if(b[i][j]==1)
					{
						var ID=new Array('d',i,j);
						ID=ID.join("");
						document.getElementById(ID).style.width="80px";
						document.getElementById(ID).style.height="80px";
						document.getElementById(ID).style.lineHeight="100px";
						document.getElementById(ID).style.fontWeight="900";
						document.getElementById(ID).style.borderRadius="5%";
						switch(now)
						{
							case 1:document.getElementById(ID).innerHTML='<img src="1.jpg" height="80" width="80" />';break;
							case 2:document.getElementById(ID).innerHTML='<img src="2.jpg" height="80" width="80" />';break;
							case 3:document.getElementById(ID).innerHTML='<img src="3.jpg" height="80" width="80" />';break;
							case 4:document.getElementById(ID).innerHTML='<img src="4.jpg" height="80" width="80" />';break;
							case 5:document.getElementById(ID).innerHTML='<img src="5.jpg" height="80" width="80" />';break;
							case 6:document.getElementById(ID).innerHTML='<img src="6.jpg" height="80" width="80" />';break;
						}
									
					}
				}
			}
		}
	 stb();
	 return;
 }
 function tuopan()
 {
	if(tuo==0)
	{
		document.getElementById("d11").style.width="80px";
		document.getElementById("d11").style.height="80px";
		document.getElementById("d11").style.lineHeight="100px";
		document.getElementById("d11").style.fontWeight="900";
		document.getElementById("d11").style.borderRadius="5%";
		switch(now)
		{
			case -1:document.getElementById("d11").innerHTML='<img src="t-1.jpg" height="80" width="80" />';break;
			case 1:document.getElementById("d11").innerHTML='<img src="t1.jpg" height="80" width="80" />';break;
			case 2:document.getElementById("d11").innerHTML='<img src="t2.jpg" height="80" width="80" />';break;
			case 3:document.getElementById("d11").innerHTML='<img src="t3.jpg" height="80" width="80" />';break;
			case 4:document.getElementById("d11").innerHTML='<img src="t4.jpg" height="80" width="80" />';break;
		}
		tuo=now;
		inow();
	}
	else
	{
		document.getElementById("d11").style.width="80px";
		document.getElementById("d11").style.height="80px";
		document.getElementById("d11").style.lineHeight="100px";
		document.getElementById("d11").style.fontWeight="900";
		document.getElementById("d11").style.borderRadius="5%";
		switch(now)
		{
			case -1:document.getElementById("d11").innerHTML='<img src="t-1.jpg" height="80" width="80" />';break;
			case 1:document.getElementById("d11").innerHTML='<img src="t1.jpg" height="80" width="80" />';break;
			case 2:document.getElementById("d11").innerHTML='<img src="t2.jpg" height="80" width="80" />';break;
			case 3:document.getElementById("d11").innerHTML='<img src="t3.jpg" height="80" width="80" />';break;
			case 4:document.getElementById("d11").innerHTML='<img src="t4.jpg" height="80" width="80" />';break;
		}
		switch(tuo)
		{
			case -1:document.getElementById("ooo").innerHTML='<img src="p-1.jpg" height="80" width="80" />';break;
			case 1:document.getElementById("ooo").innerHTML='<img src="p1.jpg" height="80" width="80" />';break;
			case 2:document.getElementById("ooo").innerHTML='<img src="p2.jpg" height="80" width="80" />';break;
			case 3:document.getElementById("ooo").innerHTML='<img src="p3.jpg" height="80" width="80" />';break;
			case 4:document.getElementById("ooo").innerHTML='<img src="p4.jpg" height="80" width="80" />';break;
		}
		var w;
		w=now;
		now=tuo;
		tuo=w;
	}
 }
 //function kong(x,y)
	
 function baozha(x,y)
 {
	var ID=new Array('d',x,y);
	ID=ID.join("");
	document.getElementById(ID).innerHTML='<img src="-1.1.jpg" height="80" width="80" />';
	setTimeout(function(){
		document.getElementById(ID).innerHTML='<img src="-1.2.jpg" height="80" width="80" />';
		setTimeout(function(){
			document.getElementById(ID).innerHTML='<img src="-1.3.jpg" height="80" width="80" />';
			setTimeout(function(){document.getElementById(ID).innerHTML='<img src="0.jpg" height="80" width="80" />';},100);
		},100);
	},100);
	box[x][y]=0;
	inow();
 }
 function over()
 {
	alert("本局结束啦~！");
	document.getElementById("score").innerHTML="最后得分:"+score;
	document.getElementById("re").innerHTML="再来一局";
 }
 function on(x,y)
 {
	var i,j;
	var r=0;
	box[1][1]=tuo;
	for(i=1;i<=6;i++)                                 //检测是否游戏结束
	{
		for(j=1;j<=6;j++)
		{
			if(now==-1) r=1;
			if(box[i][j]==0)
			{
				r=1;
				break;
			}
		}
		if(r==1) break;
	}
	box[1][1]=37;                                     //表示不能匹配
	if(r==0) over();
	x=parseInt(x);
	y=parseInt(y);
	if(x==1&&y==1)
	{
		tuopan();
		return;
	}
	if(now==-1)
	{
		baozha(x,y);
		return;
	}
	if(box[x][y]!=0) return;
	else{
		stb();
		seek(x,y);
		if(n2>=2)
		{
			for(i=1;i<=6;i++)
			{
				for(j=1;j<=6;j++){
					if(b[i][j]==1)
					{
						var ID=new Array('d',i,j);
						ID=ID.join("");
						document.getElementById(ID).style.width="80px";
						document.getElementById(ID).style.height="80px";
						document.getElementById(ID).style.lineHeight="100px";
						document.getElementById(ID).style.fontWeight="900";
						document.getElementById(ID).style.borderRadius="5%";
						document.getElementById(ID).innerHTML='<img src="0.jpg" height="80" width="80" />';
			            box[i][j]=0;
					}
				}
			}
			now=now+1;
			on(x,y);
		}//if(n2>=2)
		else
		{
			box[x][y]=now;
			ID=new Array('d',x,y);
			ID=ID.join("");
			switch(now)
			{
				case 1:document.getElementById(ID).innerHTML='<img src="1.jpg" height="80" width="80" />';score+=1;break;
				case 2:document.getElementById(ID).innerHTML='<img src="2.jpg" height="80" width="80" />';score+=3;break;
				case 3:document.getElementById(ID).innerHTML='<img src="3.jpg" height="80" width="80" />';score+=10;break;
				case 4:document.getElementById(ID).innerHTML='<img src="4.jpg" height="80" width="80" />';score+=30;break;
				case 5:document.getElementById(ID).innerHTML='<img src="5.jpg" height="80" width="80" />';score+=90;break;
				case 6:document.getElementById(ID).innerHTML='<img src="6.jpg" height="80" width="80" />';score+=300;break;
				case 7:document.getElementById(ID).innerHTML='<img src="7.jpg" height="80" width="80" />';score+=900;break;
				case 8:document.getElementById(ID).innerHTML='<img src="8.jpg" height="80" width="80" />';score+=3000;break;
			}
			document.getElementById("score").innerHTML="得分:"+score;
			inow();
		}//else	
	}//if(box[x][y]!=0)
 }//on()




 
 
 
 