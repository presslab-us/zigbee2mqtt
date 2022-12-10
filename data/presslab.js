const exposes = require('zigbee-herdsman-converters/lib/exposes');
const fz = {...require('zigbee-herdsman-converters/converters/fromZigbee'), legacy: require('zigbee-herdsman-converters/lib/legacy').fromZigbee};
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const extend = require('zigbee-herdsman-converters/lib/extend');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;

module.exports = [
    {
        zigbeeModel: ['PL-GDO1         '],
        model: 'PL-GDO1',
        vendor: 'Presslab',
        description: 'Presslab garage door controller',
        supports: 'lock/unlock',
        fromZigbee: [fz.lock],
        toZigbee: [tz.lock],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {l1: 1, l2: 2};
        },
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['closuresDoorLock']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['closuresDoorLock']);
        },
        exposes: [e.lock().withEndpoint('l1'), e.lock().withEndpoint('l2')],
    },
    {
        zigbeeModel: ['PL-HL'],
        model: 'PL-HL',
        vendor: 'Presslab',
        description: 'Presslab homelink bridge',
        supports: 'action, temperature',
        fromZigbee: [fz.command_toggle, fz.temperature],
        toZigbee: [],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {l1: 1, l2: 2, l3: 3};
        },
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['genOnOff', 'msTemperatureMeasurement']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff']);
        },
        exposes: [e.action(['toggle']).withEndpoint('l1'), e.action(['toggle']).withEndpoint('l2'), e.action(['toggle']).withEndpoint('l3'), e.temperature()],
    },
    {
        zigbeeModel: ['PL-LDSK'],
        model: 'PL-LDSK',
        vendor: 'Presslab',
        description: 'Presslab desk lamp',
        extend: extend.light_onoff_brightness(),
    },
    {
        zigbeeModel: ['PL-OS1'],
        model: 'PL-OS1',
        vendor: 'Presslab',
        description: 'Presslab overswitch single',
        configure: async (device, coordinatorEndpoint) => {
            const binds = [
                'genOnOff', 'genLevelCtrl', 'genPowerCfg', 'msIlluminanceMeasurement', 'msTemperatureMeasurement',
            ];
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, binds);
        },
        supports: 'on/off, move, illuminance, temperature',
        fromZigbee: [
            fz.command_on, fz.command_off,
            fz.command_move, fz.command_stop,
            fz.battery, fz.illuminance, fz.temperature,
        ],
        toZigbee: [],
        meta: {disableDefaultResponse: true, multiEndpoint: true},
        endpoint: (device) => {
            return {'1': 1, '2': 2, '3': 3};
        },
        exposes: [
            e.action(['brightness_move_up','brightness_move_down','brightness_stop','on','off']),
            e.battery(), e.temperature(), e.illuminance()
            ],
    },
    {
        zigbeeModel: ['PL-OS2'],
        model: 'PL-OS2',
        vendor: 'Presslab',
        description: 'Presslab overswitch double',
        configure: async (device, coordinatorEndpoint) => {
            const binds = [
                'genOnOff', 'genLevelCtrl', 'genPowerCfg', 'msIlluminanceMeasurement', 'msTemperatureMeasurement',
            ];
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, binds);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
        },
        supports: 'on/off, move, illuminance, temperature',
        fromZigbee: [
            fz.command_on, fz.command_off,
            fz.command_move, fz.command_stop,
            fz.battery, fz.illuminance, fz.temperature,
        ],
        toZigbee: [],
        meta: {disableDefaultResponse: true, multiEndpoint: true},
        endpoint: (device) => {
            return {'1': 1, '2': 2, '3': 3};
        },
        exposes: [
            e.action(['brightness_move_up_1','brightness_move_down_1','brightness_stop_1','on_1','off_1',
                'brightness_move_up_2','brightness_move_down_2','brightness_stop_2','on_2','off_2']),
            e.battery(), e.temperature(), e.illuminance()
        ],
    },
    {
        zigbeeModel: ['PL-OS3'],
        model: 'PL-OS3',
        vendor: 'Presslab',
        description: 'Presslab overswitch triple',
        configure: async (device, coordinatorEndpoint) => {
            const binds = [
                'genOnOff', 'genLevelCtrl', 'genPowerCfg', 'msIlluminanceMeasurement', 'msTemperatureMeasurement',
            ];
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, binds);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
        },
        supports: 'on/off, move, illuminance, temperature',
        fromZigbee: [
            fz.command_on, fz.command_off,
            fz.command_move, fz.command_stop,
            fz.battery, fz.illuminance, fz.temperature,
        ],
        toZigbee: [],
        meta: {disableDefaultResponse: true, multiEndpoint: true},
        endpoint: (device) => {
            return {'1': 1, '2': 2, '3': 3};
        },
        exposes: [
            e.action(['brightness_move_up_1','brightness_move_down_1','brightness_stop_1','on_1','off_1',
                'brightness_move_up_2','brightness_move_down_2','brightness_stop_2','on_2','off_2',
                'brightness_move_up_3','brightness_move_down_3','brightness_stop_3','on_3','off_3']),
            e.battery(), e.temperature(), e.illuminance()
        ],
    },
    {
        zigbeeModel: ['PL-GERMFILTER'],
        model: 'PL-GERMFILTER',
        vendor: 'Presslab',
        description: 'Presslab Germguardian filter',
        supports: 'fan, on/off',
        fromZigbee: [fz.fan, fz.PL_GERMFILTER_on_off],
        toZigbee: [
            tz.fan_mode, tz.PL_GERMFILTER_on_off,
        ],
        meta: {},
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ['hvacFanCtrl']);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ['genOnOff']);
        },
        exposes: [e.fan().withModes(['off', 'low', 'medium', 'high', 'on']), e.switch()],
    },
    {
        zigbeeModel: ['PL-THMIDEA'],
        model: 'PL-THMIDEA',
        vendor: 'Presslab',
        description: 'Presslab Midea thermostat interface',
        supports: 'temperature, heating/cooling system control, fan',
        fromZigbee: [fz.legacy.thermostat_att_report, fz.fan],
        toZigbee: [
            tz.thermostat_occupied_heating_setpoint, tz.thermostat_occupied_cooling_setpoint, tz.thermostat_setpoint_raise_lower,
            tz.thermostat_control_sequence_of_operation, tz.thermostat_system_mode, tz.fan_mode,
            tz.thermostat_local_temperature, tz.thermostat_local_temperature_calibration, tz.thermostat_running_state,
        ],
        meta: {},
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['hvacThermostat', 'hvacFanCtrl']);
        },
        exposes: [
            exposes.climate().withSetpoint('occupied_heating_setpoint', 10, 30, 1).withLocalTemperature()
                .withSystemMode(['off', 'auto', 'heat', 'cool', 'dry']).withRunningState(['idle', 'heat', 'cool'])
                .withFanMode(['low', 'medium', 'high', 'auto']).withSetpoint('occupied_cooling_setpoint', 10, 30, 1)
                .withLocalTemperatureCalibration().withPiHeatingDemand()],
    },
];
