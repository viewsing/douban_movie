//函数节流器
export default (callback) => {
    let timer;
    let throttleFunc = function(event, self) {
        timer = setTimeout(function(){
            callback.call(self, event);
        }, 200);
    }
    return function(event) {
        event.persist && event.persist(); //兼容react的合成事件不能异步访问事件的问题
        clearTimeout(timer);
        throttleFunc(event, this);
    }
}
