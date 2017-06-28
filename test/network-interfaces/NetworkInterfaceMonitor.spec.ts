import * as chai from 'chai';
import * as os from 'os';
import * as sinon from 'sinon';

import { NetworkInterfaceMonitor } from './../../src/network-interfaces/NetworkInterfaceMonitor';
import * as data from './NetworkInterfaceData';

chai.should();

describe('when monitoring IPv4 addresses on network interfaces', function() {

    let osStub: sinon.SinonStub;
    const networkInterfaceMonitor = new NetworkInterfaceMonitor();

    afterEach(function() {
        osStub.restore();
    });

    it('should return addresses from one network interface', function() {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

        // Act
        const addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        addresses.should.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return addresses from multiple network interfaces', function() {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

        // Act
        const addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        addresses.should.be.eql(['1.1.1.1', '2.2.2.2']);
    });

    it('should return an empty sequence if only internal addresses exists', function() {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

        // Act
        const addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        addresses.should.be.empty;
    });

    it('should return an empty sequence if only IPv6 addresses exists', function() {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

        // Act
        const addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        addresses.should.be.empty;
    });

    it('should return an empty sequence if no interfaces exists', function() {
        // Arrange
        osStub = sinon.stub(os, 'networkInterfaces')
            .returns(data.NO_NETWORK_INTERFACES);

        // Act
        const addresses = networkInterfaceMonitor.getIPv4Addresses();

        // Assert
        addresses.should.be.empty;
    });
});
