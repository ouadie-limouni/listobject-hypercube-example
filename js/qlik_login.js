
// LOGIN
async function qlikLogin() {
    const loggedIn = await fetch(`https://${TENANT}/api/v1/users/me`, {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'qlik-web-integration-id': WEBINTEGRATIONID,
        },
    })
    if (loggedIn.status !== 200) {
        if (sessionStorage.getItem('tryQlikAuth') === null) {
            sessionStorage.setItem('tryQlikAuth', 1);
            window.location = `https://${TENANT}/login?qlik-web-integration-id=${WEBINTEGRATIONID}&returnto=${location.href}`;
            return await new Promise(resolve => setTimeout(resolve, 10000)); // prevents further code execution
        } else {
            sessionStorage.removeItem('tryQlikAuth');
            const message = 'Third-party cookies are not enabled in your browser settings and/or browser mode.';
            alert(message);
            throw new Error(message);
        }
    }
    sessionStorage.removeItem('tryQlikAuth');
    console.log('Logged in!');
    return true;
}

async function getQCSHeaders() {
    const response = await fetch(`https://${TENANT}/api/v1/csrf-token`, {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'qlik-web-integration-id': WEBINTEGRATIONID
        },
    })

    const csrfToken = new Map(response.headers).get('qlik-csrf-token');
    return {
        'qlik-web-integration-id': WEBINTEGRATIONID,
        'qlik-csrf-token': csrfToken,
    };
}

