// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TriageOMatic {

    // Struct to hold incident details
    struct Incident {
        uint256 id;
        string description;
        string[] timeline;
        string[] affectedSystems;
        string[] anomalyAlerts;
        string[] evidenceChain;
    }

    // Struct to hold evidence details
    struct Evidence {
        uint256 id;
        string description;
        bytes32 hash; // Stores the hash of the evidence data for immutability check
    }

    // Mapping of incident IDs to Incident details
    mapping(uint256 => Incident) public incidents;

    // Mapping of evidence IDs to Evidence details
    mapping(uint256 => Evidence) public evidences;

    // Counter to keep track of incidents and evidence
    uint256 public incidentCounter;
    uint256 public evidenceCounter;

    // Event to log new incidents
    event IncidentLogged(uint256 indexed incidentId, string description);

    // Event to log new evidence
    event EvidenceLogged(uint256 indexed evidenceId, string description, bytes32 hash);

    // Function to add a new incident
    function addIncident(string memory _description, string[] memory _timeline, string[] memory _affectedSystems, string[] memory _anomalyAlerts, string[] memory _evidenceChain) public {
        incidentCounter++;
        incidents[incidentCounter] = Incident(incidentCounter, _description, _timeline, _affectedSystems, _anomalyAlerts, _evidenceChain);
        emit IncidentLogged(incidentCounter, _description);
    }

    // Function to get incident details
    function getIncidentDetails(uint256 _incidentId) public view returns (string memory, string[] memory, string[] memory, string[] memory, string[] memory) {
        Incident memory incident = incidents[_incidentId];
        return (incident.description, incident.timeline, incident.affectedSystems, incident.anomalyAlerts, incident.evidenceChain);
    }

    // Function to log evidence
    function logEvidence(string memory _description, bytes32 _hash) public {
        evidenceCounter++;
        evidences[evidenceCounter] = Evidence(evidenceCounter, _description, _hash);
        emit EvidenceLogged(evidenceCounter, _description, _hash);
    }

    // Function to verify evidence immutability
    function verifyEvidenceImmutability(uint256 _evidenceId, bytes32 _hash) public view returns (bool) {
        Evidence memory evidence = evidences[_evidenceId];
        return evidence.hash == _hash;
    }

}
