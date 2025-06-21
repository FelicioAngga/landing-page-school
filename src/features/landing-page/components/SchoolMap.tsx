import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Marker = (_: any) => <FaMapMarkerAlt onClick={() => window.open("https://www.google.com/maps?ll=3.59227,98.612683&z=19&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=8376496467592141419", "_blank")} className="size-16 text-red-500" />;

function SchoolMap() {
  const defaultProps = {
    center: {
      lat: 3.5924006747689416,
      lng: 98.61267713902686
    },
    zoom: 19
  };

  return (
    <div className='mt-20 h-[50vh]'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
        />
      </GoogleMapReact>
    </div>
  )
}

export default SchoolMap