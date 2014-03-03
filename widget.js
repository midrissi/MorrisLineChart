WAF.define('MorrisLineChart', ['waf-core/widget'], function(widget) {
	
    var MorrisLineChart = widget.create('MorrisLineChart', {
    	items: widget.property({
			type: 'datasource',
			attributes: [{
				name: 'xKey'
			}]
		}),

		ykey: widget.property({bindable: false,type: 'list', attributes: [ // Bug
			{name: 'column', title: 'Colmun'},
			{name: 'label', title: 'Label'},
			{name: 'color', title: 'Colmun', type: 'string'}
		]}),

		stacked: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		hideHover: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'enum',
			values: {
				'false': 'Always show a hover legend',
				'auto': 'Show legend on hover',
				'true': 'Never show a hover legend'
			}
		}),

		gridTextColor: widget.property({
			defaultValue: '#888',
			bindable: false,
			type: 'string',
			description: 'Placeholder color'
		}),

		axes: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		behaveLikeLine: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		chartType: widget.property({
			defaultValue: 'line',
			bindable: false,
			type: 'enum',
			values: {
				Line: 'Line',
				Area: 'Area'
			}
		}),

		grid: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		smooth: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

        init: function() {
        	var $node = $(this.node);
        	var data = [];
        	var that = this;
        	var columns = [];
        	var labels = [];
        	var lineColors = [];
        	var chart = null;
        	var dataSource = this.items();

        	this.ykey().forEach(function (ykey) {
        		columns.push(ykey.column);
        		labels.push(ykey.label);
        		lineColors.push(ykey.color);
        	});

        	this.items.onCollectionChange(onChange);
        	//WAF.addListener(that.items().getID(), "onElementSaved", onChange, "WAF");

            function onChange(){
            	dataSource.getElements(0, dataSource.length, function (result) {
                	var elements = result.elements;

                	if(elements.length == 0){
                		return;
                	}

            		if(chart){
            			chart.setData(elements);
            		}else{
            			chart = Morris[that.chartType()]({
							element: that.node.id,
							data: result.elements,
							xkey: that.items.attributeFor('xKey'),
							ykeys: columns,
							labels: labels,
							lineColors: lineColors,
							stacked: that.stacked(),
							hideHover: that.hideHover(),
							axes: that.axes(),
							grid: that.grid(),
							smooth: that.smooth(),
							behaveLikeLine: that.behaveLikeLine(),
							gridTextColor: that.gridTextColor()
						});
            		}
            	});
            }
        }
    });

    return MorrisLineChart;

});