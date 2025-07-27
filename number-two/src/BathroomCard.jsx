import { MapPin } from "lucide-react";

function BathroomCard({ title, description, distance }) {
    return (
        <div className="bathroom-card" style={{ marginBottom: '12px' }}>
            <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '500' }}>Open</span>
                        <div style={{ color: '#eab308', fontSize: '14px' }}>★★★★☆</div>
                    </div>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px', lineHeight: '1.4' }}>{description}</p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '12px' }}>
                    <MapPin style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                    <span>0.2 miles away</span>
                </div>
            </div>
        </div>
    );
}

export default BathroomCard;