import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useCookie } from "@/utils/hooks/useCookie";
import { useLocalStorage } from "primereact/hooks";
import { getDetails } from "@/utils/api/session";
import { PageContainer } from "@/layout/Containers";
import Logo from "@/components/Logo";
import MainLayout from "@/layout/Layout";
import { Button } from "react-bootstrap";

export default function Session() {
  const toast = useRef(null);
  const router = useRouter();
  const [data, setData] = useState({});
  const [sessionIdLocalStorage, setSessionIdLocalStorage] = useLocalStorage(
    "0",
    "session_id"
  );
  const [sessionIdCookie, setSessionIdCookie] = useCookie(null, "session_id");
  const [sessionId, setSessionId] = useState(router.query.session_id);

  const updatePage = async () => {
    const response = await getDetails(sessionId);
    setData(response);
  };
  useEffect(() => {
    updatePage();
  }, []);

  return (
    <MainLayout>
      <div
        style={{
          minHeight: "80vh", 
          marginTop: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            border: "1px solid blue",
            padding: "40px 0px",
          }}
        >
          <div className="col-2 shadow-2" style={{}}>
            <h5 style={{ margin: "0px" }}>Indexes Available</h5>
            <div style={{ marginTop: "15px" }}>
              <div class="field-checkbox">
                <input type="checkbox" id="city1"></input>
                <label for="city1">jan12024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city2"></input>
                <label for="city2">jan22024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city1"></input>
                <label for="city1">jan32024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city2"></input>
                <label for="city2">jan42024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city1"></input>
                <label for="city1">jan52024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city2"></input>
                <label for="city2">jan62024</label>
              </div>
              <div class="field-checkbox">
                <input type="checkbox" id="city1"></input>
                <label for="city1">jan72024</label>
              </div>
            </div>
          </div>

          <div
            className="col-8 shadow-2"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className="" style={{ padding: "20px" }}>
              <p>
                reverse mapping checking getaddrinfo for
                207-204-204-084.yourlink.ca [207.204.204.84] failed - POSSIBLE
                BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo for
                ip-187-118-160-162.user.vivozap.com.br [187.118.160.162] failed
                - POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking
                getaddrinfo for 195-154-37-122.rev.poneytelecom.eu
                [195.154.37.122] failed - POSSIBLE BREAK-IN ATTEMPT! reverse
                mapping checking getaddrinfo for
                195-154-45-62.rev.poneytelecom.eu [195.154.45.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for adsl-94-50-53-155.tarko-sale.ru [94.50.53.155] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for 195-154-45-62.rev.poneytelecom.eu [195.154.45.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for b3d29652.virtua.com.br [179.210.150.82] failed - POSSIBLE
                BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo for
                195-154-59-62.rev.poneytelecom.eu [195.154.59.62] failed -
                POSSIBLE BREAK-IN ATTEMPT! reverse mapping checking getaddrinfo
                for hn.kd.ny.adsl [42.239.30.183] failed - POSSIBLE BREAK-IN
                ATTEMPT! reverse mapping checking getaddrinfo for
                186-199-15-51.rev.cloud.scaleway.c
              </p>
            </div>
            <div
              className="shadow-1"
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "end",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <p style={{ margin: "0px" }}>
                List all IP Addresses trying to hack
              </p>
              <Button variant="primary">Submit</Button>
            </div>
          </div>
        </div>
      </div>

      {/* <PageContainer> 
                <h1>Session</h1>
                <p>Session ID: {sessionId}</p>
                <p>Status: {data.status}</p>
                <p>Details: {data.details}</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </PageContainer> */}
    </MainLayout>
  );
}
