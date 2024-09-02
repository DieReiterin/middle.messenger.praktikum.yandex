import Block, { IProps } from '@/tools/Block';
import EventBus from '@/tools/EventBus';

class MockBlock extends Block {
    render(): string {
        return '<div>Test Block</div>';
    }
}

describe('Block', () => {
    let block: MockBlock;

    beforeEach(() => {
        block = new MockBlock();
    });

    test('should initialize block and call INIT event', () => {
        const eventBusSpy = jest.spyOn(EventBus.prototype, 'emit');

        block = new MockBlock();

        expect(eventBusSpy).toHaveBeenCalledWith(Block.EVENTS.INIT);
        eventBusSpy.mockRestore();
    });

    test('should set properties and trigger componentDidUpdate on setProps', () => {
        const newProps: IProps = { testProp: 'newValue' };
        const eventBusSpy = jest.spyOn(EventBus.prototype, 'emit');
        block.setProps(newProps);

        expect((block as any).props.testProp).toEqual('newValue');
        expect(eventBusSpy).toHaveBeenCalledWith(
            Block.EVENTS.FLOW_CDU,
            expect.anything(),
            newProps,
        );
        eventBusSpy.mockRestore();
    });

    test('should add attributes to the element', () => {
        block = new MockBlock({ attr: { id: 'test-id', class: 'test-class' } });
        block.dispatchComponentDidMount();

        const element = block.getContent();

        expect(element?.getAttribute('id')).toEqual('test-id');
        expect(element?.getAttribute('class')).toEqual('test-class');
    });

    test('should render HTML and set it as element content', () => {
        block.dispatchComponentDidMount();
        const element = block.getContent();

        expect(element?.outerHTML).toBe('<div>Test Block</div>');
    });

    test('should correctly manage visibility using show and hide', () => {
        const mockParentElement = document.createElement('div');
        const mockContent = document.createElement('div');
        jest.spyOn(block, 'getContent').mockReturnValue(mockContent);
        const appendChildSpy = jest.spyOn(mockParentElement, 'appendChild');
        const removeChildSpy = jest.spyOn(mockParentElement, 'removeChild');
        mockParentElement.appendChild(mockContent);

        block.show();
        expect(appendChildSpy).toHaveBeenCalledWith(mockContent);

        block.hide();
        expect(removeChildSpy).toHaveBeenCalledWith(mockContent);
        expect(block['getContent']()?.parentElement).toBe(null);

        jest.restoreAllMocks();
    });

    test('should call componentDidUpdate when props change', () => {
        const spy = jest.spyOn(block as any, 'componentDidUpdate');
        block.setProps({ someProp: 'value' });

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('should call componentDidUnmount and remove element on unmount', () => {
        block.dispatchComponentDidMount();
        const spy = jest.spyOn(block as any, 'componentDidUnmount');

        block.hide();

        expect(spy).toHaveBeenCalled();
        expect(block.getContent()?.parentElement).toBeNull();
        spy.mockRestore();
    });
});
