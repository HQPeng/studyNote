const REJECT='reject'
const RESOLVE='resolve'
const PENDING='pending'

class MyPromise{
    constructor(executor){
        this._state=PENDING
        this._mes='undefind'
        console.log("执行内容")

        try{ 
            executor(this._resolve.bind(this) , this._reject.bind(this))
        } catch(err){
            this._reject(err)
        }
       
    }

    _change(pending , date){
        if(this._state!==PENDING){
            return
        }
        this._state=pending
        this._mes=date
        console.log(date)
        
    }

    _resolve(date){
        this._change(RESOLVE , date)
    }
    _reject(date){
        this._change(REJECT , date) 
    }

}
const p= new MyPromise((reslove)=>{
   reslove(22)
   reslove(222)
})
console.log(p);
