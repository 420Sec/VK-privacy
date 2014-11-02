
function save_options() {
    var publicKey = document.getElementById('extcrypt-publicKey').value;
    var privateKey = document.getElementById('extcrypt-privateKey').value;
    var passphrase = document.getElementById('extcrypt-passphrase').value;
    var select = document.getElementById('extcrypt-select').value;
    chrome.storage.sync.set({
        publicKey: publicKey,
        privateKey: privateKey,
        passphrase: passphrase,
        type: select
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        publicKey: '',
        privateKey: '',
        passphrase: '',
        type: 'no'
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
        document.getElementById('extcrypt-publicKey').value = items.publicKey;
        document.getElementById('extcrypt-privateKey').value = items.privateKey;
        document.getElementById('extcrypt-passphrase').value = items.passphrase;
        document.getElementById('extcrypt-select').value = items.type;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

