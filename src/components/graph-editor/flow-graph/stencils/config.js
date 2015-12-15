/**
 * [stencils 全局配置]
 * @type {Object}
 */

var stencils = {
    'start': {
        name: '开始',
        alias: 'start',
        image: '/assets/images/component-start-icon.png'
    },
    'end': {
        name: '结束',
        alias: 'end',
        image: '/assets/images/component-end-icon.png'
    },
    'decision': {
        name: '选择',
        alias: 'decision',
        image: '/assets/images/component-decision-icon.png'
    },
    'fork': {
        name: '分支',
        alias: 'fork',
        image: '/assets/images/component-fork-icon.png'
    },
    'join': {
        name: '聚合',
        alias: 'join',
        image: '/assets/images/component-join-icon.png'
    },
    'subprocess': {
        name: '嵌套流程',
        alias: 'subprocess',
        image: '/assets/images/component-subprocess-icon.png'
    },
    'api': {
        name: 'API 调用',
        alias: 'api',
        image: '/assets/images/component-api-icon.png'
    }, 
    'command': {
        name: '命令执行',
        alias: 'command',
        image: '/assets/images/component-command-icon.png'
    },
    'script': {
        name: '脚本执行',
        alias: 'script',
        image: '/assets/images/component-script-icon.png'
    },
    'inf': {
        name: '外部接口',
        alias: 'inf',
        image: '/assets/images/component-inf-icon.png'
    },
    'hand': {
        name: '人工任务',
        alias: 'hand',
        image: '/assets/images/component-hand-icon.png'
    }
}

var groups = [{
        name: '基础组件',
        stencils: ['start', 'end', 'decision', 'fork', 'join', 'subprocess']
    }, {
        name: '业务组件',
        stencils: ['api', 'command', 'script', 'inf', 'hand']
    }]

module.exports = {
    stencils: stencils,
    groups: groups
}
