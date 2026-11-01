 // api/manabadi-clone.js

export default async function handler(req, res) {
    // CORS పర్మిషన్స్ సెట్ చేయడం
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { htno } = req.query;

    if (!htno) {
        return res.status(400).json({ 
            success: false, 
            message: "Hall Ticket Number (htno) is required!" 
        });
    }

    try {
        // ఇక్కడ నువ్వు నీ ఒరిజినల్ డేటాబేస్ (Firebase / JSON) నుంచి ఆ హాల్ టికెట్ డేటాని వెతకాలి.
        // మనాబడి లాగే డేటాని ఫిల్టర్ చేసి JSON రూపంలో పంపుతుంది:

        // మాక్ డేటా (దీని బదులు నీ దగ్గర ఉన్న స్టూడెంట్స్ లిస్ట్ లేదా డేటాబేస్ పెట్టుకోవచ్చు)
        const mockDatabase = [
            { htno: "240425401", name: "Gowri Sankar", memoNo: "AP2026MEMO01", total: "540", status: "PASS", college: "SGS Arts College" },
            { htno: "240425402", name: "Student Two", memoNo: "AP2026MEMO02", total: "480", status: "PASS", college: "SGS Arts College" }
        ];

        const student = mockDatabase.find(s => s.htno === htno);

        if (student) {
            return res.status(200).json({
                success: true,
                source: "Manabadi-Clone API Engine",
                data: {
                    hallTicketNo: student.htno,
                    studentName: student.name,
                    memoNumber: student.memoNo,
                    totalMarks: student.total,
                    resultStatus: student.status,
                    institution: student.college
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Entered Hall Ticket Number not found in records."
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
            details: error.message
        });
    }
}
