function stalkSVC() {
    Stalker.follow(Process.getCurrentThreadId(), {
        transform: function (iter) {
            var insn = iter.next();
            do {
                if (insn.mnemonic === 'svc') {
                    iter.putCallout(onSVC)
                }
                iter.keep();
            } while ((insn = iter.next()) !== null);
        }
    });
}

function onSVC(context) {
    var sc = parseInt(context['x8']);
    console.log('syscall N', sc)
}
