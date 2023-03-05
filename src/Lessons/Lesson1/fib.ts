function fib(n:number) {
    let a:number = 0;
    let b:number = 1;
    for (let i = 3; i <= n; i++) {
      let c:number  = a + b;
      a = b;
      b = c;
    }
    return b;
  }

  console.log(fib(8))