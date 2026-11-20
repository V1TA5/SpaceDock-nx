import os
import pyroscope


def initialize_profiling():
    if os.getenv("PYROSCOPE_ENABLED", "true").lower() != "true":
        return

    pyroscope.configure(
        application_name="spacedock.backend",
        server_address=os.getenv(
            "PYROSCOPE_SERVER_ADDRESS",
            "http://pyroscope:4040",
        ),
        tags={
            "environment": os.getenv("DEPLOYMENT_ENV", "development"),
            "service": "backend",
        },
    )