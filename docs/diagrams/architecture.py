from diagrams import Diagram, Cluster, Edge
from diagrams.programming.language import Nodejs
from diagrams.onprem.database import Postgresql
from diagrams.onprem.container import Docker
from diagrams.onprem.client import Client

from utils import getFilenameWithoutExtension

Cluster._default_graph_attrs['fontsize'] = '20'
Edge._default_edge_attrs['fontsize'] = '20'

with Diagram(
    name='Authentication Service',
    show=False,
    filename=getFilenameWithoutExtension(__file__),
    graph_attr={
        'fontsize': '25',
        'concentrate': 'true'
    },
    node_attr={'fontsize': '20'}
):
    client = Client('Client')
    with Cluster('App container'):
        app = Nodejs('Rest API')
    with Cluster('Database container'):
        database = Postgresql()
    
    client >> Edge(label='makes HTTP\nrequests to\nand receives\nJSON data from') >> app
    app >> Edge(label='reads from\nand writes to') >> database
    [app, database] >> Edge(label='runs on') >> Docker('Docker')