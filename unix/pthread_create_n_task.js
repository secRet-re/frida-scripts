var pthread = new NativeFunction(Module.findExportByName(null, 'pthread_create'), 'int', ['pointer', 'pointer', 'pointer', 'pointer']);

var pthread_t = Memory.alloc(Process.pointerSize);
Memory.protect(pthread_t, Process.pointerSize, 'rwx');

var handler = Memory.alloc(Process.pointerSize);
Memory.protect(handler, Process.pointerSize, 'rwx');
if (Process.arch === 'arm64') {
    var writer = new Arm64Writer(handler);
    writer.putNop();
    writer.flush();
    writer.dispose();
}
Interceptor.replace(handler, new NativeCallback(function () {
    console.log('hello from', Process.getCurrentThreadId());
    return 0;
}, 'int', []));

console.log('starting thread from', Process.getCurrentThreadId());
pthread(pthread_t, NULL, handler, NULL);