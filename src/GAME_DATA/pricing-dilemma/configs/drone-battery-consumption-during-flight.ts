import { Interaction } from '../interactives/interface';

const interaction: Interaction = {
  ariaLabel: 'scenes.drone_battery_consumption_during_flight.ariaLabel',
  tableConfig: {
    columns: [
      {
        name: 'scenes.drone_battery_consumption_during_flight.package_weight',
        accessor: 'weight',
      },
      {
        name: 'scenes.drone_battery_consumption_during_flight.battery_consumption',
        accessor: 'battery',
      },
    ],
    tableData: [
      {
        weight: '1',
        battery: '0.50%',
      },
      {
        weight: '4',
        battery: '1.00%',
      },
      {
        weight: '9',
        battery: '1.50%',
      },
      {
        weight: '16',
        battery: '2.00%',
      },
      {
        weight: '25',
        battery: '2.50%',
      },
    ],
  },
};

export default interaction;
