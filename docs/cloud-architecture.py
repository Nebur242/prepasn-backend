from diagrams import Diagram, Cluster
from diagrams.firebase.develop import Authentication
from diagrams.aws.compute import Lambda
from diagrams.aws.storage import SimpleStorageServiceS3
from diagrams.aws.database import RDSInstance
from diagrams.aws.network import Route53
from diagrams.aws.management import Cloudwatch
from diagrams.generic.device import Mobile
from diagrams.generic.os import Windows

from os.path import basename, splitext
current_file_name, _ = splitext(basename(__file__))

def LambdaFunction(name: str):
    with Cluster(name):
        return Cloudwatch(f"{name} logs") << Lambda(f"{name} lambda")

with Diagram("Cloud Architecture", filename=current_file_name, show=False):
    ImagesBucket = SimpleStorageServiceS3("Images S3 Bucket")
    VideosBucket = SimpleStorageServiceS3("Videos S3 Bucket")
    HlsBucket = SimpleStorageServiceS3("HLS S3 Bucket")
    PostgresDatabase = RDSInstance("PostgresDB")
    HlsService = LambdaFunction("HLS")
    ImageService = LambdaFunction("Image")
    AuthenticationNode = Authentication("Authentication")
    DnsServer = Route53("DNS")
    Backend = LambdaFunction("Backend")
    LogsServer = Cloudwatch

    with Cluster("Clients"):
        Clients = Mobile("User"), Windows("Admin")
    
    VideosBucket >> HlsService
    HlsBucket << HlsService
    PostgresDatabase << HlsService

    ImagesBucket << ImageService
    ImageService << ImagesBucket
    
    Clients >> AuthenticationNode >> DnsServer >> Backend >> [PostgresDatabase, VideosBucket, ImagesBucket]

