export class MockStore {
    private state: any = {};

    setState(newState: any) {
        this.state = { ...this.state, ...newState };
    }

    getState() {
        return this.state;
    }

    select(selector: any) {
        return this.state[selector];
    }

    dispatch(action: any) {
        // Mock dispatch implementation
    }
}

export const mockStore = new MockStore();