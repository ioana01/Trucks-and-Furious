import React, {Component} from 'react';

export default class AddTruckForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            truckType: '',
            volume: 0,
            width: 0,
            height: 0,
            length: 0,
            mass: 0,
        }

        // this.handleTruckType = this.handleTruckType.bind(this);
        // this.handleVolume = this.handleVolume.bind(this);
        // this.handleWidth = this.handleWidth.bind(this);
        // this.handleHeight = this.handleHeight.bind(this);
        // this.handleLength = this.handleLength.bind(this);
        // this.handleMass = this.handleMass.bind(this);
        // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async componentDidMount() {

    }

    handleTruckType(event) {
        this.setState({ truckType: event.target.value });
    }

    handleVolume(event) {
        this.setState({ volume: event.target.value });
    }

    handleWidth(event) {
        this.setState({ width: event.target.value });
    }

    handleHeight(event) {
        this.setState({ height: event.target.value });
    }

    handleLength(event) {
        this.setState({ length: event.target.value });
    }

    handleMass(event) {
        this.setState({ mass: event.target.value });
    }

    handleFormSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className='row justify-content-md-center'>
                <div className='col-md-8 mt-4 p-4'>
                    <h2 className='mb-4'>Add Truck Form</h2>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className='form-group'>
                            <label htmlFor='truck-type-input'>Truck type:</label>
                            <input type='text' className='form-control' id='truck-type-input'
                                placeholder='Please enter your Truck type'
                                onChange={this.handleTruckType}
                                value={this.state.truckType} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='volume-input'>Permitted Volume:</label>
                            <input type='number' className='form-control' id='volume-input'
                                placeholder='Please enter your Truck permitted Volume'
                                onChange={this.handleVolume}
                                value={this.state.volume} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='length-input'>Trail Length:</label>
                            <input type='number' className='form-control' id='length-input'
                                placeholder='Please enter your Truck Trail Length'
                                onChange={this.handleLength}
                                value={this.state.length} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='height-input'>Trail Height:</label>
                            <input type='number' className='form-control' id='height-input'
                                placeholder='Please enter your Truck Trail Height'
                                onChange={this.handleHeight}
                                value={this.state.height} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='width-input'>Trail Width:</label>
                            <input type='number' className='form-control' id='width-input'
                                placeholder='Please enter your Truck Trail Width'
                                onChange={this.handleWidth}
                                value={this.state.width} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
