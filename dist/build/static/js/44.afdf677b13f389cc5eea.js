webpackJsonp([44],{557:function(t,e,a){var l=a(32)(a(933),a(820),null,null);t.exports=l.exports},820:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sub-page-wrap"},[a("h4",[t._v("基础用法")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("b-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputValue1,callback:function(e){t.inputValue1=e},expression:"inputValue1"}})],1)]),t._v(" "),a("h4",[t._v("禁用状态")]),t._v(" "),a("div",{staticClass:"text-muted"},[t._v("输入框不可用状态。")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("b-input",{attrs:{placeholder:"请输入内容",disabled:!0},model:{value:t.inputValue2,callback:function(e){t.inputValue2=e},expression:"inputValue2"}})],1)]),t._v(" "),a("h4",[t._v("文本域")]),t._v(" "),a("div",{staticClass:"text-muted"},[t._v("用于输入多行文本信息，通过将 type 属性的值指定为 textarea。")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("b-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:t.textarea1,callback:function(e){t.textarea1=e},expression:"textarea1"}})],1)]),t._v(" "),a("h4",[t._v("可自适应文本高度的文本域")]),t._v(" "),a("div",{staticClass:"text-muted"},[t._v("通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("b-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:t.textarea2,callback:function(e){t.textarea2=e},expression:"textarea2"}}),t._v(" "),a("br"),t._v(" "),a("b-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.textarea3,callback:function(e){t.textarea3=e},expression:"textarea3"}})],1)]),t._v(" "),a("h4",[t._v("复合型输入框")]),t._v(" "),a("div",{staticClass:"text-muted"},[t._v("可前置或后置元素，一般为标签或按钮")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("div",[a("b-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputValue3,callback:function(e){t.inputValue3=e},expression:"inputValue3"}},[a("template",{slot:"prepend"},[t._v("Http://")])],2)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"15px"}},[a("b-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputValue4,callback:function(e){t.inputValue4=e},expression:"inputValue4"}},[a("template",{slot:"append"},[t._v(".com")])],2)],1)])]),t._v(" "),a("h4",[t._v("尺寸")]),t._v(" "),a("div",{staticClass:"text-muted"},[t._v("可通过size属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small两种尺寸。")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-24"},[a("b-input",{attrs:{placeholder:"请输入内容"},model:{value:t.inputValue5,callback:function(e){t.inputValue5=e},expression:"inputValue5"}}),t._v(" "),a("b-input",{attrs:{size:"lg",placeholder:"请输入内容"},model:{value:t.inputValue6,callback:function(e){t.inputValue6=e},expression:"inputValue6"}}),t._v(" "),a("b-input",{attrs:{size:"sm",placeholder:"请输入内容"},model:{value:t.inputValue7,callback:function(e){t.inputValue7=e},expression:"inputValue7"}})],1)])])},staticRenderFns:[]}},933:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a(206);e.default={components:{BInput:l.a},data:function(){return{inputValue1:"",inputValue2:"",inputValue3:"",inputValue4:"",inputValue5:"",inputValue6:"",inputValue7:"",textarea1:"",textarea2:"",textarea3:""}}}}});