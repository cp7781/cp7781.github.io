const model = {
    name: 'cp7781',
    version: 1,
    stores: [
        {
            name: 'wallpapers',
            indices: [
                'identifier', // integer
                'image'
            ]
        },
        {
            name: 'quotes',
            indices: [
                'identifier', // integer
                'text',
                'author'
            ]
        },
        {
            name: 'locations',
            indices: [
                'identifier', // integer
                'name'
            ]
        }
    ]
}

export function putWallpaper(wallpaper, execute) {
    put(model.stores[0].name, wallpaper, execute)
}

export function getWallpaper(identifier, execute) {
    get(model.stores[0].name, identifier, execute)
}

export function putQuote(quote, execute) {
    put(model.stores[1].name, quote, execute)
}

export function getQuote(identifier, execute) {
    get(model.stores[1].name, identifier, execute)
}

export function putLocation(location, execute) {
    put(model.stores[2].name, location, execute)
}

export function getLocation(identifier, execute) {
    get(model.stores[2].name, identifier, execute)
}

function put(store, object, execute) {
    openDatabase(database => {
        const transaction = database.transaction(store, 'readwrite')
        const objectStore = transaction.objectStore(store)
        const request = objectStore.put(object)
        request.addEventListener('success', event => {
            if (execute) {
                execute()
            }
        })
        request.addEventListener('error', event => {
            console.error('could not put data into ' + store)
        })
    })
}

function get(store, identifier, execute) {
    openDatabase(database => {
        const transaction = database.transaction(store)
        const objectStore = transaction.objectStore(store)
        const request = objectStore.get(identifier)
        request.addEventListener('success', event => {
            if (execute) {
                execute(event.target.result)
            }
        })
        request.addEventListener('error', event => {
            console.error('could not get data from ' + store)
        })
    })
}

function openDatabase(execute) {
    const name = model.name
    const version = model.version
    const request = window.indexedDB.open(name, version)
    request.addEventListener('success', event => {
        execute(event.target.result)
    })
    request.addEventListener('error', event => {
        console.error('could not open database')
    })
    request.addEventListener('upgradeneeded', event => {
        const database = event.target.result;
        {
            const index = 0
            const wallpapers = model.stores[index].name
            const id = model.stores[index].indices[0]
            database.createObjectStore(wallpapers, { keyPath: id, autoIncrement: true })
        }
        {
            const index = 1
            const quotes = model.stores[index].name
            const id = model.stores[index].indices[0]
            database.createObjectStore(quotes, { keyPath: id, autoIncrement: true })
        }
        {
            const index = 2
            const locations = model.stores[index].name
            const id = model.stores[index].indices[0]
            database.createObjectStore(locations, { keyPath: id, autoIncrement: true })
        }
    })
}
