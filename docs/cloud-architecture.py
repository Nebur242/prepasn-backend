from diagrams import Diagram, Cluster
from diagrams.firebase.develop import Authentication
from diagrams.aws.mobile import APIGateway
from diagrams.aws.compute import Lambda
from diagrams.aws.storage import SimpleStorageServiceS3
from diagrams.aws.database import RDSInstance
from diagrams.generic.device import Mobile
from diagrams.generic.os import Windows

from os.path import basename, splitext
current_file_name, _ = splitext(basename(__file__))

with Diagram("Cloud Architecture", filename=current_file_name, show=False):
    ImagesBucket = SimpleStorageServiceS3("Images S3 Bucket")
    VideosBucket = SimpleStorageServiceS3("Videos S3 Bucket")
    HlsBucket = SimpleStorageServiceS3("HLS S3 Bucket")
    PostgresDatabase = RDSInstance("PostgresDB")
    HlsService = Lambda("HLS service")
    ImageService = Lambda("Image service")
    AuthenticationNode = Authentication("Authentication")

    with Cluster("Backend"):
        Backend = APIGateway("Api Gateway") >> Lambda("Serverless Backend")
    with Cluster("Clients"):
        Clients = Mobile("User"), Windows("Admin")
    
    VideosBucket >> HlsService
    HlsBucket << HlsService
    PostgresDatabase << HlsService

    ImagesBucket << ImageService
    ImageService << ImagesBucket
    
    Clients >> AuthenticationNode >> Backend >> [PostgresDatabase, VideosBucket, ImagesBucket]

