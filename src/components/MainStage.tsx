import * as React from 'react';

import HeaderDOM from 'templates/header';

interface Properties_t {
};

interface State_t {
    view: 'main';
};

export default class MainStage extends React.Component<Properties_t, State_t> {
    render() {
        return <div className='container'>
            {this.getView()}
        </div>;
    };

    constructor(props: Properties_t) {
        super(props);
        this.state = {view: 'main'};
    };

    getView() {
        const { view } = this.state;
        if (view === 'main') {
            return HeaderDOM;
        }

        return <div/>
    }
}
