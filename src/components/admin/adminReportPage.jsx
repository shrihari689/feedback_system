import React, { useEffect, useState } from 'react';
import "../../adminReport.css"
import HomeNavBar from './../home/HomeNavBar';

const AdminReportPage = ({ user }) => {


    const [isPrinting, setIsPrinting] = useState(false);


    useEffect(() => {
        const handleChangePrintPage = (_) => {
            setIsPrinting(true);
        }
        const handleAbortPrintPage = (_) => {
            setIsPrinting(false);
        }
        window.addEventListener("beforeprint", handleChangePrintPage);
        window.addEventListener("afterprint", handleAbortPrintPage);
        return () => {
            window.removeEventListener("beforeprint", handleChangePrintPage);
            window.removeEventListener("afterprint", handleAbortPrintPage);
        }
    })

    const handlePrint = (_) => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
        }, 500)
    }

    return (
        <React.Fragment>
            {!isPrinting && <HomeNavBar isAdmin={true} user={user} />}
            <div className="Admin__ReportPage">
                <header className="Admin__ReportHeader">
                    <h2>Report Summary</h2>
                    {
                        !isPrinting &&
                        <button onClick={handlePrint} className="Admin_ReportButton">Print Report</button>
                    }
                </header>
                <section className="Admin__ReportDashboard">
                    <div className="Admin_ReportCard">
                        <span>Total Feeds:</span>
                        <span className="Admin_ReportCard_Count">65</span>
                    </div>
                    <div className="Admin_ReportCard blue">
                        <span>Solved Feeds:</span>
                        <span className="Admin_ReportCard_Count">65</span>
                    </div>
                    <div className="Admin_ReportCard light_red">
                        <span>Unsolved Feeds:</span>
                        <span className="Admin_ReportCard_Count">65</span>
                    </div>
                    <div className="Admin_ReportCard orange">
                        <span>Partially Solved Feeds:</span>
                        <span className="Admin_ReportCard_Count">65</span>
                    </div>
                    <div className="Admin_ReportCard red">
                        <span>Rejected Feeds:</span>
                        <span className="Admin_ReportCard_Count">65</span>
                    </div>
                </section>

            </div>
        </React.Fragment>
    );
}

export default AdminReportPage;