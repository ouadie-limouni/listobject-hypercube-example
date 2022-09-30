// ENIGMA CONNECTION
async function connectEnigma(qcsHeaders, appId, identity) {
    const [session, app] = await getEnigmaSessionAndApp(appId, qcsHeaders, identity);
    return [session, app];
}

async function getEnigmaSessionAndApp(appId, headers, identity) {
    const params = Object.keys(headers)
        .map((key) => `${key}=${headers[key]}`)
        .join('&');

    return (async () => {
        const schema = await (await fetch('https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json')).json();

        try {
            return await createEnigmaAppSession(schema, appId, identity, params);
        }
        catch {
            const waitSecond = await new Promise(resolve => setTimeout(resolve, 1500));
            try {
                return await createEnigmaAppSession(schema, appId, identity, params);
            }
            catch (e) {
                throw new Error(e);
            }
        }
    })();
}

async function createEnigmaAppSession(schema, appId, identity, params) {
    const session = enigma.create({
        schema,
        url: `wss://${TENANT}/app/${appId}?${params}`,
        identity: identity
    });
    const enigmaGlobal = await session.open();
    const enigmaApp = await enigmaGlobal.openDoc(appId);
    return [session, enigmaApp];
}
