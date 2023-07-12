from diagrams import Diagram, Cluster
from diagrams.programming.language import NodeJS
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.container import Docker

from util import getFilenameWithoutExtension

graph_attr = {
    # 'fontsize': '45',
    'bgcolor': 'transparent',
    'fontcolor': 'white'
}

clu_attr = {
    'fontcolor': 'black'
}

with Diagram('Authentication Service', filename=getFilenameWithoutExtension(__file__), show=False, graph_attr=graph_attr):
    with Cluster('App container', graph_attr=clu_attr):
        node_server = NodeJS()
    with Cluster('Database container', graph_attr=clu_attr):
        database = PostgreSQL()

    node_server - database