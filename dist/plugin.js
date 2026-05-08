const CAKK_TEXT_MAGIC = 'CAKK:TEXT:1:';

function createElement(hostApi, type, props, children) {
  if (typeof hostApi?.createElement !== 'function') {
    throw new Error('Host API must provide createElement()');
  }

  return hostApi.createElement(type, props, children);
}

export function createCakkPlugin(hostApi) {
  return {
    id: 'raw-text',
    title: 'Raw text',
    composer: {
      title: 'Text',
      priority: 100,
      createDraftState() {
        return { text: '' };
      },
      renderDraftEditor({ draftState, setDraftState, disabled, emitChatAction }) {
        return createElement(hostApi, 'textarea', {
          value: String(draftState?.text || ''),
          disabled: Boolean(disabled),
          onChange(event) {
            const text = String(event?.target?.value || '');
            setDraftState({ text });
            if (text.trim()) {
              void emitChatAction('typing');
            }
          },
        });
      },
      async compose({ draftState }) {
        const value = String(draftState?.text || '').trim();
        if (!value) {
          throw new Error('Text payload cannot be empty');
        }

        return {
          bytes: new TextEncoder().encode(`${CAKK_TEXT_MAGIC}${value}`),
          metaEntries: [{ content_type: 'text/plain' }],
        };
      },
      async getPushPreview({ draftState }) {
        return String(draftState?.text || '').trim();
      },
    },
    register(registry) {
      const canHandle = ({ text }) => typeof text === 'string' && text.startsWith(CAKK_TEXT_MAGIC);

      registry.registerPreview({
        id: 'raw-text',
        priority: 100,
        canHandle,
        renderPreview({ text }) {
          return text.slice(CAKK_TEXT_MAGIC.length);
        },
      });

      registry.registerMessageRender({
        id: 'raw-text',
        priority: 100,
        canHandle,
        renderMessage({ text }) {
          return createElement(
            hostApi,
            'pre',
            { className: 'message-text' },
            text.slice(CAKK_TEXT_MAGIC.length),
          );
        },
      });
    },
  };
}
