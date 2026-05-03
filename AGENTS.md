# AGENTS.md

Локальные инструкции для репозитория `cakk-plugin-raw-text`.

## Что это

- Это отдельный plugin-repo для `Cakk v2`.
- Репозиторий готовится под публикацию на GitHub и дальнейшую загрузку клиентом по `owner/repo`.
- Текущий плагин реализует baseline-формат raw text.

## Source Of Truth

- Контракт загрузки плагина задается файлами:
  - `cakk-plugin.json`
  - `dist/plugin.js`
- Пока отдельного build-pipeline нет, `dist/plugin.js` считается runtime-artifact и source of truth.
- `src/plugin.js` можно держать как редактируемый исходник, но выкладываемый контракт задает именно `dist/plugin.js`.

## Контракт v1

- manifest: `cakk-plugin.json`
- entry bundle: `dist/plugin.js`
- bundle должен экспортировать named factory `createCakkPlugin`
- хост вызывает `createCakkPlugin(hostApi)` и получает plugin object

## Ограничения

- Не тянуть зависимости от внутреннего кода `CAKK-transport-web`
- Не импортировать `react` из хоста напрямую
- Рендер должен использовать только то, что хост явно передал в `hostApi`
