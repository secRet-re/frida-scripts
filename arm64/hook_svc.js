/**
 * attach any SVC in a given space
 */

var m = Process.findModuleByName('whatever.so');
m.enumerateRanges('--x').forEach(function (range) {
    Memory.scanSync(range.base, range.size, '01 00 00 d4').forEach(function (match) {
        Interceptor.attach(match.address, function () {
            var sc = parseInt(this.context['x8']);
            console.log('syscall N', sc)
        })
    })
})
