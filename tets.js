var A = [];
for (var i=0;i<18;i++) {
    A.push(Math.floor(Math.random() * 20))
}

function QuickSort(A)
{
    if (A.length == 0) return [];
    var a = [], b = [], p = A[0];
    for (var i = 1; i < A.length; i++)
    { if (A[ i ] < p) a[a.length] = A[ i ];
    else b[b.length] = A[ i ];
    }
    return QuickSort(a).concat( p,QuickSort(b) );
}





var start = new Date();

console.log(A);

var end = new Date();
console.log('Скорость ' + (end.getTime()-start.getTime()) + ' мс');