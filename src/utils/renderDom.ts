import Block from '@/tools/Block';

export default function renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    if (!root) {
        return;
    }

    const content = block.getContent();
    if (!content) {
        return;
    }

    root.appendChild(content);

    block.dispatchComponentDidMount();

    return root;
}
