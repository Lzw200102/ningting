webpackJsonp([12],{MrBq:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("lC5x"),a=n.n(r),s=n("J0Oq"),o=n.n(s),u={data:function(){return{SingerId:this.$route.params.SingerId,allAlbum:""}},methods:{gethotSingerHotworks:function(){var t=this;return o()(a.a.mark(function e(){var n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/artist/album?id="+t.SingerId+"&limit=30");case 2:if(200===(n=e.sent).status){e.next=5;break}return e.abrupt("return",t.$message.error("获取失败！"));case 5:console.log(1251),console.log(n.data.hotAlbums),t.allAlbum=n.data.hotAlbums;case 8:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.gethotSingerHotworks()}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Determinelocation"},[n("h2",[t._v("所有专辑")]),t._v(" "),n("ul",t._l(t.allAlbum,function(e,r){return n("li",{key:r},[t._v(t._s(e.name))])}),0)])},staticRenderFns:[]};var l=n("C7Lr")(u,i,!1,function(t){n("RE6y")},"data-v-66c056f0",null);e.default=l.exports},RE6y:function(t,e){}});
//# sourceMappingURL=12.c50a491337befee8bd16.js.map