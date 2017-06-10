import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Form, TextField } from '../../../src/index';
import { validateAsync } from '../../helpers';

const Input = fieldProps => h(TextField, {
  ...fieldProps,
  errorClassName: 'error',
  successClassName: 'success',
});

export class RegisterMeal extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: StylePropType,
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        food: {
          component: Input,
          label: 'Food',
          getStatuses: this.getFoodErrors,
          value: '',
        },
        name: {
          component: Input,
          label: 'Name',
          value: '',
        },
        address: {
          label: 'Address',
          fields: {
            street: {
              component: Input,
              label: 'Street',
              value: '',
            },
            zip: {
              component: Input,
              label: 'ZIP Code',
              value: '',
            },
          },
        },
      },
    };
  }

  getFoodErrors = (food) => {
    if (!food.isTouched) return undefined;

    if (!food.value) {
      return [{ type: 'error', message: 'Please specify a food' }];
    }

    return validateAsync(500, food.value).then(x => [x]);
  };

  handleFieldsChange = (fields) => {
    this.setState({
      fields,
    });
  }

  render() {
    return h(Form, {
      className: 'RegisterMeal',
      fields: this.state.fields,
      onFieldTouch: this.handleFieldTouch,
      onFieldsChange: this.handleFieldsChange,
      style: this.props.style,
    });
  }
}
