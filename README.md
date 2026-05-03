# cakk-plugin-raw-text

Первый внешний plugin-repo для `Cakk v2`.

Назначение:

- raw text composer
- raw text preview
- raw text message render

Публикационный контракт:

- `cakk-plugin.json` — manifest
- `dist/plugin.js` — entry bundle

Bundle экспортирует:

- `createCakkPlugin(hostApi)`

Хост должен:

- загрузить manifest
- загрузить `dist/plugin.js`
- вызвать `createCakkPlugin(hostApi)`
- зарегистрировать возвращенный plugin в своем runtime registry
