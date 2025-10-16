var dm_iw=50, dm_ih=50;
var dm_delay=30, dm_actdelay=4000, dm_startdelay=9000, dm_interdelay=9000;
var dm_step=2, dm_X, dm_dir=Math.round(Math.random());
// случайная задержка перед началом
dm_startdelay=1000+Math.round(dm_startdelay*Math.random());
var dm_song=["В лесу родилась Ёлочка",
"В лесу она росла",
"Зимой и летом стройная,",
"Зеленая была",
"Метель ей пела песенку",
"Спи, Ёлочка, бай-бай",
"Мороз снежком укутывал",
"Смотри, не замерзай"], dm_songid=0, dm_greet='С Новым Годом!';
var dm_talk=1;// выводить ли текст Деда Мороза
var dm_bX=0,dm_bY=0,dm_px=0,dm_py=0, dm_Tout=null,dm_On=false,dm_Ok=false, dm_right=2;
var dm_onload=null;
// browser
var IE=null, NS4=null, NS6=null, KO=null, OP=null, navN=navigator.appName;
if(navN.indexOf('Netscape')>=0){ if(navigator.appVersion.substring(0,1)>=5 ) NS6=1; else NS4=1;}
else if(navN.indexOf('Konqueror')>=0) KO=1;
else if(navN.indexOf('Opera')>=0 || navigator.appMinorVersion==null || navigator.appMinorVersion=='') OP=1;
else IE=1;

// полное имя файла
var dm_path='';
var dm_fname='dm0';
// полное имя файла
var dm_file=dm_path+dm_fname+dm_dir;
// preload *act.gif картинки
var dm_imgact = new Image();
dm_imgact.src=dm_file+'act.gif';

// вывести невидимый DIV
var styl="position:absolute; z-index:255; visibility:hidden; top:0; left:-"+dm_iw, ns4styl='';
if(NS4){ document.write("<style>.bNon {"+styl+"}</style>"); ns4styl='class=bNon ';}
document.write("<div id=ddm "+ns4styl+"style='"+styl+"'>"+
"<a href='#' onclick='return dm_mClick(this);' onmouseover='dm_mOver();' onmouseout='dm_mOut(0);' onmousemove='dm_mMove();'style='cursor:default'>"+
"<img name=dmimg src='"+dm_file+".gif' border=0></a>"+
"</div>");

//начальное положение
dm_getgeom();
dm_X=(dm_dir)? L+W-dm_iw:-dm_iw;
if(NS6) { dm_right=18; if(dm_dir) dm_X-=15;}

// отображение on/off
function dm_show(mode) {
	if(!dm_Ok) return;//запуск разрешен?
	if(mode==1){
		if(dm_talk) window.status="... "+dm_song[dm_songid]+" ...";
		dm_songid++; if(dm_songid>=dm_song.length) dm_songid=0;
		dm_adjust();
		dm_iS.visibility='visible';
		dm_On=true;
	}	else {
		dm_On=false;
		dm_StopTout();
		dm_iS.visibility='hidden';
	}
}
// движение (свежие координаты)
function dm_adjust(){
	dm_StopTout();
	if(dm_On) {
		dm_getgeom();
		// пора остановить ?
		if( (dm_dir && dm_X<-dm_iw) ||
				(!dm_dir && dm_X>=L+W-dm_right-dm_iw) ) {dm_chgDir(); return;}
		dm_bX=(W-dm_iw)/2;
		dm_bY=H-dm_ih;
		dm_X+=(dm_dir)? -dm_step:dm_step;
		x=dm_X;//L+W-dm_iw-dm_bX;
		y=T+dm_bY;
		if(x!=dm_px||y!=dm_py) {
			dm_px=x;
			dm_py=y;
			dm_iS.left=x;
			dm_iS.top=y;
		}
	}
	dm_StartTout();
}
// тек.геометрия окна
function dm_getgeom() {
	if(IE) {
		dBd=document.body;
		L=dBd.scrollLeft;
		T=dBd.scrollTop;
		W=dBd.clientWidth;
		H=dBd.clientHeight;
	} else {
		L=window.pageXOffset;
		T=window.pageYOffset;
		W=window.innerWidth;
		H=window.innerHeight;
	}
	if(NS4||NS6) H-=15; // поправка на скроллер
}
// сменить направление
function dm_chgDir() {
	dm_show(0); 
	dm_dir=dm_dir ? 0:1;
	// полное имя файла
	dm_file=dm_path+dm_fname+dm_dir;
	// запустить прокрутку через время
	dm_startdelay=1000+dm_interdelay*Math.random();
	d=Math.round(dm_startdelay/1000)
	dtl=''; if(d<2) dtl='у'; else if(d<5) dtl='ы';
	if(dm_talk) window.status="[ Вернусь через "+d+" секунд"+dtl+". Дед Мороз. ]";
	dm_Tout=setTimeout("dm_mOut(1)",dm_startdelay);
}
// навели мышь
function dm_mOver() {
	dm_mMove();
	if(OP) dm_img.src='';
	dm_img.src=dm_file+'act.gif';
	dm_StopTout();
	dm_Tout=setTimeout("dm_mOut(0)",dm_actdelay);
}
// убрали мышь
function dm_mOut(mode) {
	dm_img.src=dm_file+'.gif';
	if(mode) dm_show(1);
	else {
		if(dm_talk) window.status="... "+dm_song[dm_songid]+" ...";
		else window.status='';
		dm_songid++; if(dm_songid>=dm_song.length) dm_songid=0;
	}
	dm_adjust();
}
// движени мыши
function dm_mMove() {
	window.status=dm_greet;
}
// кликнули
function dm_mClick(z) { dm_show(0); return false; }

// таймер on/off
function dm_StartTout() {
	dm_StopTout();
	dm_Tout=setTimeout("dm_adjust()",dm_delay);
}
function dm_StopTout() {
	if(dm_Tout) {
		clearTimeout(dm_Tout);
		dm_Tout=null;
	}
}
// INIT
function dm_binit() {
	if(KO) return;
	else if(NS6||OP) {
		dm_i=document.getElementById('ddm');
		dm_iS=dm_i.style;
	} else if(NS4) {
		dm_i=document.layers['ddm'];
		dm_iS=dm_i;
		window.captureEvents(Event.UNLOAD);
	} else {
		dm_i=document.all('ddm');
		dm_iS=dm_i.style;
	}
	if(KO||NS6) dm_img=document.images.dmimg;
	else	dm_img=dm_i.document.images.dmimg;
	window.onunload=dm_StopTout;
	dm_Ok=true;//start!

	dm_Tout=setTimeout("dm_show(1)",dm_startdelay);
	d=Math.round(dm_startdelay/1000)
	dtl=''; if(d<2) dtl='у'; else if(d<5) dtl='ы';
	if(dm_talk) window.status="[ Буду через "+d+" секунд"+dtl+". Дед Мороз. ]";
	if(dm_onload) dm_onload();
}

if(KO||NS4||NS6) {
	dm_onload=window.onload;
	window.onload=dm_binit;
} else dm_binit();
