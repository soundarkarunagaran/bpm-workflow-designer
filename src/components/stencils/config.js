/**
 * [stencils 全局配置]
 * @type {Object}
 */
var config = {
    groups: [{
        name: '基础组件',
        stencils: [{
            name: '开始',
            alias: 'start',
            image: '/assets/images/component-start-icon.png'
        }, {
            name: '结束',
            alias: 'end',
            image: '/assets/images/component-end-icon.png'
        }, {
            name: '选择',
            alias: 'decision',
            image: '/assets/images/component-decision-icon.png'
        }, {
            name: '分支',
            alias: 'fork',
            image: '/assets/images/component-fork-icon.png'
        }, {
            name: '聚合',
            alias: 'join',
            image: '/assets/images/component-join-icon.png'
        }, {
        	name: '嵌套流程',
        	alias: 'subprocess',
        	image: '/assets/images/component-subprocess-icon.png'
        }]
    }, {
        name: '业务组件',
        stencils: [{
            name: 'API 调用',
            alias: 'api',
            image: '/assets/images/component-api-icon.png'
        },  {
            name: '命令执行',
            alias: 'command',
            image: '/assets/images/component-command-icon.png'
        }, {
            name: '脚本执行',
            alias: 'script',
            image: '/assets/images/component-script-icon.png'
        }, {
            name: '外部接口',
            alias: 'inf',
            image: '/assets/images/component-inf-icon.png'
        }, {
        	name: '人工任务',
        	alias: 'hand',
        	image: '/assets/images/component-hand-icon.png'
        }, {

        }]
    }]
}

module.exports = config
