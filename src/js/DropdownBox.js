/*
*  dropdown box by Seke1412
*  find more about me on ngodungcan.com
*  any contribution please mail to ngodungcan@gmail.com
*  v1.2.5 support responsive, support collapse when clicking outside
*  1. Change height to maxHeight
*  2. Set height to '100%' / 'auto' when toggle expand
*  3. Txt lineHeight = parent.offsetHeight
*  4. Support linkArray (aka href array) in case the DDItemTemplate is <a> tag
-- 1.2.5 --
*  5. Support onClickCb
*  6. Support remove previous "ul"
*  7. Suppoert centralize all DD via window.dropdownMap
* */


var DropDownBox = function(holderID, options, placeholder, onClickCb){
    this.holderID = holderID;
    this.parent = document.getElementById(holderID);
    const previousList = this.parent.getElementsByClassName('dropdown__box')[0]
    if (previousList){
        this.parent.removeChild(previousList)
    }

    this.holder = document.createElement("ul");
    this.holder.className = "dropdown__box";
    this.holder.style.overflowY = "hidden";
    this.itemArray = [];
    this.onClickCb = onClickCb

    this.arrow = this.parent.getElementsByClassName("dropdown__box__arrow")[0];

    if(this.parent === undefined){
        return;
    }

    this.defaults = {
        numReveal:5,
        showFull:false,
        itemHeight:30,
        itemArray: [0,1,2,3,4,5,6,7],
        className : "dropdown__item",
        txtClassName:"dropdown__item__txt",
        DDItemTemplate: '<p class="dropdown__item__txt">' + '</p>',
        linkArray: []
    }

    this.options = {};
    Object.assign(this.options, this.defaults, options);


    if(placeholder !== undefined){
        this.options.itemArray.unshift(placeholder);
    }else{
        var ph = this.options.itemArray[0]
        this.options.itemArray.unshift(ph);
    }

    if (this.options.linkArray.length > 0) {
        this.options.linkArray.unshift(" ");
    }

    this.numReveal = this.options.itemArray.length;


    if(!this.options.showFull){
        this.options.numReveal = Math.min(this.options.numReveal, this.options.itemArray.length);
    }else{
        this.options.numReveal = this.options.itemArray.length;
    }

    this.holder.style.height = '100%';
    this.holder.style.maxHeight = this.options.itemHeight + "px";


    this.isExpand = false;
    this.totalHeight = 50;
    this.init();
    this.addEvent();
    this.registerToWindow();
}

DropDownBox.prototype.registerToWindow = function () {
    if (window.dropdownMap) {
        if (window.dropdownMap.size > 0 && window.dropdownMap.has(this.holderID)) {
            window.dropdownMap.delete(this.holderID);
        }
    }else {
        window.dropdownMap = new Map();
    }

    window.dropdownMap.set(this.holderID, this)
}

DropDownBox.prototype.init = function(){
    for(var i = 0; i<this.options.itemArray.length; i++){
        var item = document.createElement("li");
        item.className = this.options.className;
        item.setAttribute("itemID", i);
        item.innerHTML  = this.options.DDItemTemplate;
        this.holder.appendChild(item);
        var txt = item.getElementsByClassName(this.options.txtClassName)[0];
        if (this.options.linkArray.length > 1) {
            txt.href = this.options.linkArray[i];
        }
        txt.innerHTML = this.options.itemArray[i];
        txt.style.lineHeight = this.parent.offsetHeight + "px";
        if(i == 0){
            this.placeHolder = txt;
        }
        this.itemArray.push(item);
    }

    this.parent.appendChild(this.holder);
    this.totalHeight = (this.options.itemHeight+1)*this.options.numReveal
}


DropDownBox.prototype.addEvent = function(){
    window.removeEventListener('resize', this.fnResize);
    window.addEventListener("resize", this.fnResize.bind(this));
    this.holder.addEventListener("click", this.expand.bind(this));
}

DropDownBox.prototype.expand = function(e){
    e.stopPropagation();

    if (window.dropdownMap && window.dropdownMap.size > 0) {
        window.dropdownMap.forEach((value, key) => {
            if (key !== this.holderID) {
                value.collapse()
            }
        })
    }

    var self = this;
    var target = e.target;
    var id = e.target.getAttribute("itemID");
    var childTag = target.getElementsByClassName(self.options.txtClassName)[0];


    if (this.options.linkArray.length > 0 && childTag.href != ''  && childTag.tagName == "A" && id != 0) {
        window.location = childTag.href
    }

    var res = e.target.getElementsByClassName(self.options.txtClassName)[0].innerHTML;
    self.placeHolder.innerHTML = res;
    this.holder.scrollTop = 0;

    if (self.onClickCb !== undefined && id != 0) {
        self.onClickCb(res)
    }
    self.toggleExpand(self);
}

DropDownBox.prototype.collapse = function(){
    this.holder.style.height = '100%';
    TweenMax.killTweensOf(this.holder);
    TweenMax.to(this.holder, .5, {maxHeight: this.options.itemHeight, ease:Quint.easeOut});
    if(this.options.numReveal < this.options.itemArray.length){
        this.holder.style.overflowY = "hidden";
    }

    if(this.arrow !== undefined){
        TweenMax.killTweensOf(this.arrow);
        TweenMax.to(this.arrow, .3, {alpha:1, ease:Sine.easeOut});
    }
    this.holder.scrollTop = 0;
    this.isExpand = false;
}


DropDownBox.prototype.toggleExpand = function(self){
    const isExpand = !self.isExpand;
    let holderHeight = isExpand ? "auto" : "100%";
    let maxHeight = isExpand ? self.totalHeight : self.options.itemHeight;
    let overflow = isExpand ? "scroll" : "hidden";
    let arrowAlpha = isExpand ? 0 : 1;

    self.holder.style.height = holderHeight;
    TweenMax.killTweensOf(self.holder);
    TweenMax.to(self.holder, .5, {maxHeight: maxHeight, ease:Quint.easeOut});

    if(self.options.numReveal < self.options.itemArray.length){
        self.holder.style.overflowY = overflow;
    }

    if(self.arrow !== undefined){
        TweenMax.killTweensOf(self.arrow);
        TweenMax.to(self.arrow, .3, {alpha:arrowAlpha, ease:Sine.easeOut});
    }

    self.isExpand = isExpand;
}

DropDownBox.prototype.fnResize = function(){
    var holderHeight = this.parent.offsetHeight;
    for(var i = 0; i< this.itemArray.length; i++){
        var item = this.itemArray[i];
        var txt = item.getElementsByClassName(this.options.txtClassName)[0];
        txt.style.lineHeight = holderHeight + "px";
    }
}

DropDownBox.prototype.getCurrentValue = function(){
    return this.placeHolder.innerHTML;
}
