(function(){"use strict";var t={234:function(t,e,o){var i=o(7195),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("img",{attrs:{alt:"GPT Audiobook logo",height:"256px",width:"256px",src:o(7383)}}),e("span",[t.loading?e("h2",[t._v(" Generating AI Short Story")]):e("h2",[t._v(" AI Generated Audiobooks ")]),e("Adsense",{staticStyle:{display:"block"},attrs:{"data-ad-client":"ca-pub-7023023584987784","data-ad-slot":"2698286691","data-ad-format":"auto","data-full-width-responsive":"true"}})],1),e("br"),e("div",[e("label",{attrs:{for:"genre-select"}},[t._v("Type A Genre")]),e("br"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.genre,expression:"genre"}],attrs:{type:"text",id:"genre-select",list:"genres"},domProps:{value:t.genre},on:{input:function(e){e.target.composing||(t.genre=e.target.value)}}}),e("datalist",{attrs:{id:"genres"}},t._l(t.genres,(function(o,i){return e("option",{key:i,domProps:{value:o}},[t._v(" "+t._s(o)+" ")])})),0)]),e("br"),e("div",[e("label",{attrs:{for:"length-select"}},[t._v("Type A Story Length")]),e("br"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.length,expression:"length"}],attrs:{type:"text",id:"length-select",list:"lengths"},domProps:{value:t.length},on:{input:function(e){e.target.composing||(t.length=e.target.value)}}}),e("datalist",{attrs:{id:"lengths"}},t._l(t.lengths,(function(o,i){return e("option",{key:i,domProps:{value:o}},[t._v(" "+t._s(o)+" ")])})),0)]),e("br"),e("div",[e("label",{attrs:{for:"story-prompt"}},[t._v("Seed story with a prompt, or leave blank for total AI creativity:")]),e("br"),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.userIdea,expression:"userIdea"}],attrs:{id:"story-prompt",name:"story",rows:"5",cols:"33"},domProps:{value:t.userIdea},on:{input:function(e){e.target.composing||(t.userIdea=e.target.value)}}})]),e("div",[e("label",{attrs:{for:"genre-select"}},[t._v("Select A Voice")]),e("br"),e("select",{attrs:{name:"voices",id:"voice-select"},domProps:{value:t.selectedVoiceIndex},on:{change:function(e){return t.setVoice(e)}}},[e("option",{attrs:{disabled:"",value:"-1"}},[t._v("Select Voice")]),t._l(t.voices,(function(o,i){return e("option",{key:i,domProps:{value:i}},[t._v(t._s(o.name)+" - "+t._s(o.lang))])}))],2)]),e("div",[e("label",{attrs:{for:"music-select"}},[t._v("Select Background Music")]),e("br"),e("select",{attrs:{name:"music",id:"music-select"},domProps:{value:t.selectedMusicIndex},on:{change:function(e){return t.setMusic(e)}}},[e("option",{attrs:{disabled:"",value:"-1"}},[t._v("Select Background Music")]),t._l(t.music,(function(o,i){return e("option",{key:i,domProps:{value:i}},[t._v(t._s(o))])}))],2)]),e("br"),e("div",[e("ul",[t.readyToGenerate?e("button",{on:{click:t.generateBook}},[t._v("Generate "+t._s(t.genre)+" Story")]):e("button",{on:{click:t.stopStory}},[t._v("Stop")])]),t._v(" "+t._s(this.currentBook.text)+" ")]),e("Adsense",{attrs:{"data-ad-client":"ca-pub-7023023584987784","data-ad-slot":"6833537473","data-ad-format":"auto","data-full-width-responsive":"true"}})],1)},n=[],r=(o(7658),o(6005));class a extends EventTarget{constructor(t,e={}){super(),this.apiKey=t,this.sk=new r.Z(e),this.baseUrl="https://api.openai.com/v1/completions",this.books={},this.booksReady=!1,this.currentBook={},this.apiUrl="https://gpt-audiobook.jcompsolu.com",this.sk.getVoices(),this.songList=["/scary.mp3","/adventure.mp3","/romantic.mp3"]}async generateBook(t={}){try{this.dispatchEvent(new CustomEvent("storygenerating",{detail:{event:event}}));const e=await fetch(this.baseUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify(t)});this.books=await e.json(),this.booksReady=!0,this.currentBook=JSON.parse(this.books.choices[0].text.trim()),this.dispatchEvent(new CustomEvent("storygenerated",{detail:{book:this.currentBook}}))}catch(e){this.booksReady=!1,this.dispatchEvent(new Event("storygeneratederror"))}}pauseStory(){this.sk.pauseSynth()}stopStory(){this.sk.getSynth().cancel()}async readStory(t,e=0){try{this.sk.addEventListener("speechkitutterancestart",(function(){this.isPlaying=!0})),this.sk.addEventListener("speechkitutteranceend",(function(){this.isPlaying=!1,this.dispatchEvent(new CustomEvent("storyreadended",{bubbles:!0,detail:{book:this.currentBook}}))}));const o={model:"text-davinci-003",prompt:t,temperature:1,max_tokens:2048};if(await this.generateBook(o),!this.booksReady)throw new Error("ChatGPT is busy right now. Please try again in a few minutes!");this.dispatchEvent(new CustomEvent("storyreadstarted",{bubbles:!0,detail:{book:this.currentBook}})),this.sk.speak(this.currentBook.text),this.getBgMusic(e),this.saveStory(this.currentBook)}catch(o){try{this.sk.speak(this.currentBook.text),this.getBgMusic(e)}catch(o){alert(o.message),this.dispatchEvent(new Event("storyreaderror"))}}}async getBgMusic(t){this.audioContext=new AudioContext,this.audio=new Audio(this.songList[t]),this.audio.volume=.3;const e=this.audioContext.createGain();e.gain.setValueAtTime(0,.1);const o=this.audioContext.createMediaElementSource(this.audio);o.connect(this.audioContext.destination),this.audio.play()}stopBgMusic(){this.audio.pause()}convertToText(t){const e=t.text.replace(/<\/?[^>]+(>|$)/g,"");return e.trim()}async saveStory(t){try{if(localStorage.books){const e=JSON.parse(localStorage.books);e.push(t),localStorage.books=JSON.stringify(e)}else localStorage.books=JSON.stringify([t]);await fetch(this.apiUrl+"/api/upload-story",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:t})})}catch(e){return e}}}var c={name:"App",data(){return{isLoading:!1,isPlaying:!1,openAi:{},books:[],currentBook:{text:""},selectedVoiceIndex:-1,selectedVoice:{},selectedMusicIndex:0,userIdea:"",genre:"",genres:["Horror","Comedy","Love","True Crime","Sci-Fi","Fantasy","History","Action","Politics","Spirituality","Prose","Western","Legend","Erotica"],lengths:["2 sentence","1 paragraph","2 paragraph","3 paragraph","4 paragraph","5 paragraph","6 paragraph","7 paragraph","8 paragraph","9 paragraph","10 paragraph"],length:"",voices:[],music:["Scary","Adventure","Romantic"]}},mounted(){setTimeout((()=>{this.voices=this.openAi.sk.getVoices(),this.selectedVoice=this.voices[0]}),"1000")},async created(){const t=await fetch("https://gpt-audiobook.jcompsolu.com/api/get-key"),e=await t.json();this.openAi=new a(e.token,{pitch:.88,rate:.8}),this.openAi.addEventListener("storygenerating",(function(){this.isLoading=!0})),this.openAi.addEventListener("storygenerated",(function(t){this.isLoading=!1,this.currentBook=t.detail.book})),this.openAi.addEventListener("speechkitutterancestarted",(function(){this.isPlaying=!0})),this.openAi.sk.synth.addEventListener("end",(function(){this.isPlaying=!1,this.isLoading=!1}))},computed:{readyToGenerate(){return!this.isLoading&&!this.isPlaying},loading(){return this.isLoading},playing(){return this.isPlaying},prompt(){return""!=this.userIdea?`generate a ${this.length} ${this.genre} story based on ${this.userIdea} with a title. Return a well formatted JSON object with a title property that contains the title, a text property that contains the story and ssml property that contains an well formatted SSML file prefixing <?xml version="1.0" ?> generated from the story. Serialized the JSON object as a string.`:`generate a ${this.length} ${this.genre} story with a title. Return a well formatted JSON object with a title property that contains the title, a text property that contains the story and ssml property that contains an well formatted SSML file prefixing <?xml version="1.0" ?> generated from the story. Serialized the JSON object as a string.`},storyText(){return this.currentBook.text}},methods:{setVoice(t){this.selectedVoiceIndex=t.target.value,this.selectedVoice=this.voices[this.selectedVoiceIndex],this.openAi.sk.setSpeechVoice(this.selectedVoice)},setMusic(t){this.selectedMusicIndex=t.target.value},pauseStory(){this.openAi.pauseStory(),this.isPlaying=!1},stopStory(){this.openAi.stopStory(),this.isPlaying=!1,this.isLoading=!1,this.openAi.stopBgMusic()},resumeStory(){this.openAi.resumeStory(),this.isPlaying=!0},generateBook(){const t=this;this.isLoading=!0;const e=new Promise((function(e,o){try{t.openAi.readStory(t.prompt,t.selectedMusicIndex),e()}catch(i){o(i)}}));return e.then((()=>{t.isPlaying=!0,t.isLoading=!1})).catch((()=>{t.isPlaying=!1,t.isLoading=!1})),e}}},u=c,d=o(3736),l=(0,d.Z)(u,s,n,!1,null,null,null),h=l.exports,p=o(5387);i.ZP.config.productionTip=!1,i.ZP.use(o(3411)),i.ZP.use(p.Z.Adsense),new i.ZP({render:t=>t(h)}).$mount("#app")},7383:function(t,e,o){t.exports=o.p+"img/gpt-audiobook-logo.d151748d.png"}},e={};function o(i){var s=e[i];if(void 0!==s)return s.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,o),n.exports}o.m=t,function(){var t=[];o.O=function(e,i,s,n){if(!i){var r=1/0;for(d=0;d<t.length;d++){i=t[d][0],s=t[d][1],n=t[d][2];for(var a=!0,c=0;c<i.length;c++)(!1&n||r>=n)&&Object.keys(o.O).every((function(t){return o.O[t](i[c])}))?i.splice(c--,1):(a=!1,n<r&&(r=n));if(a){t.splice(d--,1);var u=s();void 0!==u&&(e=u)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[i,s,n]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){o.p="/"}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,i){var s,n,r=i[0],a=i[1],c=i[2],u=0;if(r.some((function(e){return 0!==t[e]}))){for(s in a)o.o(a,s)&&(o.m[s]=a[s]);if(c)var d=c(o)}for(e&&e(i);u<r.length;u++)n=r[u],o.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return o.O(d)},i=self["webpackChunkgpt_audiobook"]=self["webpackChunkgpt_audiobook"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=o.O(void 0,[998],(function(){return o(234)}));i=o.O(i)})();
//# sourceMappingURL=app.89891523.js.map