import './style.css'

export default function Xp({ total }:any) {
    return (
        <div className="xp">{total}
            <span>xp</span>
        </div>
    )
}