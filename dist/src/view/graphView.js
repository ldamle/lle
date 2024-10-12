class GraphView {
    constructor(treeData, width = 800, height = 600) {
        this.treeData = treeData;
        this.width = width;
        this.height = height;
        // Создаем элемент для всплывающих подсказок
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background', 'rgba(0, 0, 0, 0.75)')
            .style('color', 'white')
            .style('padding', '5px')
            .style('border-radius', '5px')
            .style('visibility', 'hidden');
        this.svg = d3
            .select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        this.g = this.svg.append('g').attr('transform', 'translate(50, 50)');
        const graphData = {
            nodes: [
                { id: 'Node 1' },
                { id: 'Node 2' },
                { id: 'Node 3' },
                { id: 'Node 4' },
                { id: 'Node 5' }
            ],
            links: [
                { source: 'Node 1', target: 'Node 2' },
                { source: 'Node 2', target: 'Node 3' },
                { source: 'Node 3', target: 'Node 4' },
                { source: 'Node 4', target: 'Node 5' },
                { source: 'Node 5', target: 'Node 1' }
            ]
        };
        this.simulation = d3
            .forceSimulation(graphData.nodes)
            .force('link', d3
            .forceLink(graphData.links)
            .id((d) => d.id)
            .distance(150))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));
        // Рендерим связи (линии) и настраиваем их стиль
        const link = this.svg
            .append('g')
            .selectAll('line')
            .data(graphData.links)
            .enter()
            .append('line')
            .attr('stroke-width', 4) // Увеличиваем толщину
            .attr('stroke', '#999'); // Задаем цвет
        // Рендерим узлы (круги) с возможностью перемещения
        const node = this.svg
            .append('g')
            .selectAll('circle')
            .data(graphData.nodes)
            .enter()
            .append('circle')
            .attr('r', 20)
            .attr('fill', 'steelblue') // Задаем цвет узлов
            .call(this.drag(this.simulation))
            .on('mouseover', (event, d) => {
            tooltip
                .html(d.id)
                .style('visibility', 'visible')
                .style('top', `${event.pageY}px`)
                .style('left', `${event.pageX + 10}px`);
        })
            .on('mousemove', (event) => {
            tooltip
                .style('top', `${event.pageY}px`)
                .style('left', `${event.pageX + 10}px`);
        })
            .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });
        // Настраиваем симуляцию для обновления позиций узлов и линий на каждом шаге
        this.simulation.on('tick', () => {
            link.attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);
            node.attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y);
        });
    }
    dragstarted(event, d) {
        if (!event.active) {
            this.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    dragended(event, d) {
        if (!event.active) {
            this.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }
    drag(simulation) {
        return d3
            .drag()
            .on('start', this.dragstarted.bind(this))
            .on('drag', this.dragged.bind(this))
            .on('end', this.dragended.bind(this));
    }
}
export {};
